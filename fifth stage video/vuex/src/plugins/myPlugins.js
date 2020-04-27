function myPlugin(Vue) {
  Vue.globalMethod = function () {
    console.log("hello globalMethod");
  };
  Vue.prototype.$vmMethod = function () {
    console.log("hello $vmMethod");
  };
  Vue.directive("lower-text", function (el, binding) {
    el.textContent = binding.value.toLowerCase();
  });
}
export default myPlugin;
