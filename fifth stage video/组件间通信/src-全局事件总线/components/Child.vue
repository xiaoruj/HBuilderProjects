<template>
  <div>
    <h3>Child组件</h3>
    <button @click="add">添加</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      persons: [(id: 2), (name: "李易峰")],
    };
  },
  methods: {
    add() {
      this.$globalEventBus.$emit("add-person", this.person);
    },
  },
};
</script>

<style scoped></style>
