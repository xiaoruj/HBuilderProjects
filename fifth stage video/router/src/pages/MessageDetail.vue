<template>
  <ul>
    <li>ID: {{ detail.id }}</li>
    <li>Title: {{ detail.title }}</li>
    <li>Content: {{ detail.content }}</li>
  </ul>
</template>

<script>
export default {
  props: {
    id: Number,
    count: Number,
    msg: String,
  },
  data() {
    return {
      details: [],
      detail: {},
    };
  },
  created() {
    setTimeout(() => {
      const details = [
        { id: 1, title: "title001", content: "content001" },
        { id: 2, title: "title002", content: "content002" },
        { id: 3, title: "title003", content: "content003" },
        { id: 4, title: "title004", content: "content004" },
      ];
      this.details = details;
      this.findDetail();
    }, 1000);
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      this.findDetail();
    },
  },
  methods: {
    findDetail() {
      const id = this.id;
      const detail = this.details.find((item) => item.id === id);
      this.detail = detail;
    },
  },
};
</script>

<style></style>
