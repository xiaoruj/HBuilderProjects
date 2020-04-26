<template>
  <div>
    <h1>App组件...</h1>
    <ul>
      <li v-for="person in person" :kef="person.id">
        {{ person.name }}
      </li>
    </ul>
    <Child ref="child" />
  </div>
</template>

<script>
import Child from "@comps/Child";

export default {
  data() {
    return {
      person: [{ id: 1, name: "李易峰" }],
    };
  },
  created() {
    console.log(this.$refs.child);
  },
  mounthed() {
    this.$globalEventBus.$off("add-person", this.addPerson);
  },
  methods: {
    addPerson(person) {
      this.persons.push(person);
    },
  },
  components: {
    Child,
  },
};
</script>

<style scoped></style>
