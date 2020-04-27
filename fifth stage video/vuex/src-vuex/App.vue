<template>
  <div>
    <p>clicked: {{ count }} times, count is {{ oddOrEven }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">increment if odd</button>
    <button @click="incrementAsync">increment async</button>
  </div>
</template>

<script>
export default {
  mounted() {
    // this.$vmMethod();
  },
  computed: {
    oddOrEven() {
      return this.$store.state.count % 2 === 1 ? "奇数" : "偶数";
    },
  },
  methods: {
    increment() {
      this.$store.dispatch("increment");
    },
    decrement() {
      this.$store.dispatch("decrement");
    },
    incrementIfOdd() {
      this.$store.dispatch("incrementIfOdd");
    },
    incrementAsync() {
      this.$store.dispatch("incrementAsync");
    },
  },
};
</script>

<style></style>
