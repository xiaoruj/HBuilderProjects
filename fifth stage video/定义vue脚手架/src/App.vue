<template>
  <div>
    <h1 class="title">{{ title }}</h1>
    <HelloWorld />
    <HelloWorld></HelloWorld>
    <hello-world></hello-world>
    <hello-world />
    <hello />
    <img class="logo" src="" alt="logo" />
  </div>
</template>

<script>
import HelloWorld from "@comps/HelloWorld";
export default {
  data() {
    return {
      title: "李易峰",
    };
  },
  components: {
    HelloWorld,
  },
};
</script>

<style>
.title {
  color: pink;
}
.logo {
  display: block;
  width: 500px;
  height: 500px;
}
</style>
