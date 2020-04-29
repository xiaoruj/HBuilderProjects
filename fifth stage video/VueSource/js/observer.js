function Observer(data) {
  //储存data
  this.data = data;
  //walk ,init start ,开始走起
  this.walk(data);
}

Observer.prototype = {
  constructor: Observer,
  walk: function (data) {
    var me = this;
    //将data上面属性展开成一个数组然后进行遍历
    Object.keys(data).forEach(function (key) {
      //将数据重新定义成响应式数据
      me.convert(key, data[key]);
    });
  },
  convert: function (key, val) {
    //定义响应式传入所有数据，key,val
    this.defineReactive(this.data, key, val);
  },

  defineReactive: function (data, key, val) {
    var dep = new Dep();
    //进行隐式递归调用,data上所有属性都会变成响应式属性
    var childObj = observe(val);
    //将data上数据定义成响应式
    Object.defineProperty(data, key, {
      enumerable: true, // 可枚举
      configurable: false, // 不能再define
      get: function () {
        if (Dep.target) {
          dep.depend();
        }
        return val;
      },
      set: function (newVal) {
        if (newVal === val) {
          return;
        }
        //更新值
        val = newVal;
        // 新的值是object的话，进行监听
        childObj = observe(newVal);
        // 通知订阅者
        dep.notify();
      },
    });
  },
};

function observe(value, vm) {
  //判断value存不存在,在判断是不是对象类型
  if (!value || typeof value !== "object") {
    return;
  }

  return new Observer(value);
}

var uid = 0;

function Dep() {
  this.id = uid++;
  this.subs = [];
}

Dep.prototype = {
  addSub: function (sub) {
    //subscribe订阅
    this.subs.push(sub);
  },

  depend: function () {
    Dep.target.addDep(this);
  },

  removeSub: function (sub) {
    var index = this.subs.indexOf(sub);
    if (index != -1) {
      this.subs.splice(index, 1);
    }
  },

  notify: function () {
    this.subs.forEach(function (sub) {
      sub.update();
    });
  },
};

Dep.target = null;
