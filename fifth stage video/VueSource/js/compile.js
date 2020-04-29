//用来编译模板的  el dom元素   vm MVVM实例对象
function Compile(el, vm) {
  //将vm保存在this上(compile)
  this.$vm = vm;
  //el是不是元素节点，获取dom元素
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);

  if (this.$el) {
    //将node元素转换为Fragment节点,el上所有内容添加到fragment上面，元素所有子节点添加到新的创建文档碎片节点中
    this.$fragment = this.node2Fragment(this.$el);
    //将文档碎片里面的插值语法编译
    this.init();
    //将文档碎片节点添加到el语法上
    this.$el.appendChild(this.$fragment);
  }
}

Compile.prototype = {
  constructor: Compile,
  node2Fragment: function (el) {
    //创建一个文档碎片
    var fragment = document.createDocumentFragment(),
      child;

    // 将原生节点拷贝到fragment
    while ((child = el.firstChild)) {
      fragment.appendChild(child);
    }
    return fragment;
  },

  init: function () {
    //将模板语法编译成最终显示的元素节点，文本内容（编译语法）
    this.compileElement(this.$fragment);
  },

  compileElement: function (el) {
    //获取元素所有子节点
    var childNodes = el.childNodes,
      me = this;
    //把childNodes变为真数组,然后进行遍历
    [].slice.call(childNodes).forEach(function (node) {
      //获取元素文本内容
      var text = node.textContent;
      //匹配插值语法
      var reg = /\{\{(.*)\}\}/;

      if (me.isElementNode(node)) {
        me.compile(node);
        //判断是不是文本节点,匹配文本节点里面的内容是否有差值语法
      } else if (me.isTextNode(node) && reg.test(text)) {
        //编译插值语法，获取name
        me.compileText(node, RegExp.$1.trim());
      }
      //判断是否还有子节点，子节点里面有没有值
      if (node.childNodes && node.childNodes.length) {
        //递归调用编译子节点
        me.compileElement(node);
      }
    });
  },

  compile: function (node) {
    //获取元素所有属性
    var nodeAttrs = node.attributes,
      me = this;

    [].slice.call(nodeAttrs).forEach(function (attr) {
      //获取单个属性名
      var attrName = attr.name;
      //判断属性是否是指令属性
      if (me.isDirective(attrName)) {
        //获取指令属性对应表达式
        var exp = attr.value;
        //截取指令属性
        var dir = attrName.substring(2);
        // 事件指令
        if (me.isEventDirective(dir)) {
          //绑定事件
          compileUtil.eventHandler(node, me.$vm, exp, dir);
          // 普通指令
        } else {
          compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        }
        //将编译好的属性删除
        node.removeAttribute(attrName);
      }
    });
  },
  //expresson表达式(name)
  compileText: function (node, exp) {
    //编译工具方法
    compileUtil.text(node, this.$vm, exp);
  },

  isDirective: function (attr) {
    return attr.indexOf("v-") == 0;
  },

  isEventDirective: function (dir) {
    return dir.indexOf("on") === 0;
  },

  isElementNode: function (node) {
    //读取上面nodeType属性如果等于1就是元素节点
    return node.nodeType == 1;
  },

  isTextNode: function (node) {
    //读取上面nodeType属性如果等于1就是文本节点
    return node.nodeType == 3;
  },
};

// 指令处理集合
var compileUtil = {
  text: function (node, vm, exp) {
    this.bind(node, vm, exp, "text");
  },

  html: function (node, vm, exp) {
    this.bind(node, vm, exp, "html");
  },

  model: function (node, vm, exp) {
    this.bind(node, vm, exp, "model");

    var me = this,
      val = this._getVMVal(vm, exp);
    node.addEventListener("input", function (e) {
      var newValue = e.target.value;
      if (val === newValue) {
        return;
      }

      me._setVMVal(vm, exp, newValue);
      val = newValue;
    });
  },

  class: function (node, vm, exp) {
    this.bind(node, vm, exp, "class");
  },
  //directive指令 node 节点 vm 实例对象 exp 表达式
  bind: function (node, vm, exp, dir) {
    //取出要处理的函数 textUpdater
    var updaterFn = updater[dir + "Updater"];
    //判断函数是否存在并调用
    updaterFn && updaterFn(node, this._getVMVal(vm, exp));
    new Watcher(vm, exp, function (value, oldValue) {
      updaterFn && updaterFn(node, value, oldValue);
    });
  },

  // 事件处理
  eventHandler: function (node, vm, exp, dir) {
    //获取事件类型 ['on', 'click']
    var eventType = dir.split(":")[1],
      //获取事件回调函数
      fn = vm.$options.methods && vm.$options.methods[exp];

    if (eventType && fn) {
      //绑定事件监听,改变事件回调函数的this为vm
      node.addEventListener(eventType, fn.bind(vm), false);
    }
  },
  //获取vm上的值
  _getVMVal: function (vm, exp) {
    //将vm存储起来
    var val = vm;
    //将表达式调用split方法用.拆分
    exp = exp.split(".");
    //遍历数组，取出k
    exp.forEach(function (k) {
      val = val[k];
    });
    return val;
  },

  _setVMVal: function (vm, exp, value) {
    var val = vm;
    exp = exp.split(".");
    exp.forEach(function (k, i) {
      // 非最后一个key，更新val的值
      if (i < exp.length - 1) {
        val = val[k];
      } else {
        val[k] = value;
      }
    });
  },
};

var updater = {
  textUpdater: function (node, value) {
    //将节点文本内容设置成对应的值如果是undef就为空
    node.textContent = typeof value == "undefined" ? "" : value;
  },

  htmlUpdater: function (node, value) {
    //给node节点设置html内容
    node.innerHTML = typeof value == "undefined" ? "" : value;
  },

  classUpdater: function (node, value) {
    // 获取元素上的class属性的值 red
    var className = node.className;
    // 给元素设置新的className
    node.className = className + " " + value;
  },

  modelUpdater: function (node, value, oldValue) {
    node.value = typeof value == "undefined" ? "" : value;
  },
};
