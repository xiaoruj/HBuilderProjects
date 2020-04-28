<template>
  <ul>
    <li v-for="item in news" :key="item.id">
      {{ item.content }}
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      news: [],
    };
  },
  created() {
    console.log("news created()");
    setTimeout(() => {
      const news = [
        { id: 1, content: "news杨紫1" },
        { id: 2, content: "news杨紫2" },
        { id: 3, content: "news杨紫3" },
        { id: 4, content: "news杨紫4" },
      ];
      this.news = news;
    }, 1000);
  },
  beforeDestroy() {
    console.log("new beforeDestroy()");
  },
};
</script>

<style></style>
