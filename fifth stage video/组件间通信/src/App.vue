<template>
  <div>
    <h1>App组件...</h1>

    <Child>
      <template #title>
        <h3>子组件标题~~~</h3>
      </template>
      <template #list="{ persons }">
        <ul>
          <li v-for="person in persons" :key="person.id">
            {{ person.name }}
          </li>
        </ul>
      </template>
    </Child>
  </div>
</template>

<script>
import Child from "@comps/Child";

export default {
  components: {
    Child,
  },
};
</script>

<style scoped></style>
