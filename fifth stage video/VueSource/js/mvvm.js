function MVVM(options) {
  //this 是vm实例对象，将options保存到vm上
  this.$options = options || {};
  //将data数据保存到vm上
  var data = (this._data = this.$options.data);
  //定义me变量存储this
  var me = this;

  // 数据代理
  // 实现 vm.xxx -> vm._data.xxx
  //key提取data所有属性名组成一个数组进行遍历
  Object.keys(data).forEach(function (key) {
    //代理属性传入key
    me._proxyData(key);
  });
  //初始化计算属性，代理computed计算属性到vm上
  this._initComputed();
  //observe将data数据变成响应式数据
  observe(data, this);
  //编译模板差值语法
  this.$compile = new Compile(options.el || document.body, this);
}

MVVM.prototype = {
  constructor: MVVM,
  $watch: function (key, cb, options) {
    new Watcher(this, key, cb);
  },

  _proxyData: function (key, setter, getter) {
    var me = this;
    setter =
      setter ||
      //给实例对象添加name属性
      Object.defineProperty(me, key, {
        configurable: false, //不可以从新配置
        enumerable: true, //可以遍历出来
        get: function proxyGetter() {
          //代理属性读操作
          return me._data[key]; //返回原来属性的值
        },
        set: function proxySetter(newVal) {
          //代理属性写操作
          me._data[key] = newVal; //返回原来属性的值
        },
      });
  },

  _initComputed: function () {
    var me = this;
    //将$options下面的computed计算属性获取出来
    var computed = this.$options.computed;
    //判定computed是不是对象类型
    if (typeof computed === "object") {
      //如果是对象，就提取computed所有属性进行遍历
      Object.keys(computed).forEach(function (key) {
        //计算属性的数据代理，将计算属性每一个key添加到vm上
        Object.defineProperty(me, key, {
          //如果计算属性的值是一个函数，如果是，就是get方法，如果不是就找到get方法
          get:
            typeof computed[key] === "function"
              ? computed[key]
              : computed[key].get,
          //计算属性不需要设置，计算属性当里面的值发生变化会自动更新
          set: function () {},
        });
      });
    }
  },
};
