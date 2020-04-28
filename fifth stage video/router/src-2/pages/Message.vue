<template>
  <div>
    <ul>
      <li v-for="item in messages" :key="item.id">
        <router-link :to="`/home/message/detail/${item.id}?count=123`">
          {{ item.content }}
        </router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
    };
  },
  created() {
    console.log("message created()");
    setTimeout(() => {
      const messages = [
        { id: 1, content: "messages李易峰1" },
        { id: 2, content: "messages李易峰2" },
        { id: 3, content: "messages李易峰3" },
        { id: 4, content: "messages李易峰4" },
      ];
      this.messages = messages;
    }, 1000);
  },
  beforeDestroy() {
    console.log("message beforeDestroy()");
  },
};
</script>

<style></style>
