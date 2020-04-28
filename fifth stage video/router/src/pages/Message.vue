<template>
  <div>
    <ul>
      <li v-for="item in messages" :key="item.id">
        <router-link
          :to="{
            name: 'messageDetail',
            params: { id: item.id },
            query: { count: 123 },
          }"
        >
          {{ item.content }}
        </router-link>
        <button @click="push(item.id)">push</button>
        <button @click="replace(item.id)">replace</button>
      </li>
    </ul>
    <button @click="back">back</button>
    <router-view msg="123"></router-view>
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
  methods: {
    push(id) {
      this.$router.push({
        name: "messageDetail",
        params: { id },
        query: { count: 123 },
      });
    },
    replace(id) {
      this.$router.replace(`/home/message/detail/${id}`);
    },
    back() {
      this.$router.back();
    },
  },
};
</script>

<style></style>
