<template>
  <div>
    <slot name="title"></slot>
    <div>
      <slot name="list" :persons="persons"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      persons: [
        { id: 1, name: "李易峰" },
        { id: 2, name: "杨紫" },
      ],
    };
  },
};
</script>

<style scoped></style>
