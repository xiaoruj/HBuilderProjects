<template>
  <div>
    <h1>App组件...</h1>
    <ul>
      <li v-for="person in persons" :key="person.id">
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
      persons: [{ id: 1, name: "杨紫" }],
    };
  },
  created() {},
  mounted() {
    this.$refs.child.$on("add-person", this.addPerson);
  },
  berforeDestory() {
    this.$refs.child.$off("add-person", this.addPerson);
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

<style></style>
