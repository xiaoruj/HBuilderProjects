<template>
  <div>
    <p v-lower-text="'HELLO baidu'"></p>
    <p>clicked: {{ count }} times, count is {{ oddOrEven }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">increment if odd</button>
    <button @click="incrementAsync">increment async</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  mounted() {
    this.$vmMethod();
  },
  computed: {
    // oddOrEven() {
    //   return this.$store.state.count % 2 === 1 ? "奇数" : "偶数";
    // },
    ...mapState(["count"]),
    ...mapGetters(["oddOrEven"]),
  },
  methods: {
    // increment() {
    //   this.$store.dispatch("increment");
    // },
    // decrement() {
    //   this.$store.dispatch("decrement");
    // },
    // incrementIfOdd() {
    //   this.$store.dispatch("incrementIfOdd");
    // },
    // incrementAsync() {
    //   this.$store.dispatch("incrementAsync");
    // },
    ...mapActions(["incrementIfOdd", "incrementAsync"]),
    ...mapMutations(["INCREMENT", "DECREMENT"]),
  },
};
</script>

<style></style>
