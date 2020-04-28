<template>
  <div>
    <ul>
      <li v-for="item in news" :key="item.id">
        {{ item.content }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      news: [],
    };
  },
  created() {
    console.log("new created()");
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
  beforeDestory() {
    console.log("news beforeDestroy()");
  },
};
</script>

<style></style>
