<template>
  <ul class="todo-main">
    <Item
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      :updateTodo="updateTodo"
      :delTodo="delTodo"
    />
  </ul>
</template>

<script>
import Item from "@comps/Item";
export default {
  data() {
    return {
      todos: JSON.parse(window.localStorage.getItem("todos")) || [],
    };
  },
  mounted() {
    this.$bus.$on("add-todo", this.addTodo);
    this.$bus.$on("handle-select-all", this.handleSelectAll);
    this.$bus.$on("del-completed-todo", this.delCompletedTodo);
    this.$bus.$emit("receive-todos", this.todos);
  },
  beforeDestory() {
    this.$bus.$off("add-todo", this.addTodo);
    this.$bus.$off("handle-select-all", this.handleSelectAll);
    this.$bus.$off("del-completed-todo", this.delCompletedTodo);
  },
  methods: {
    //更新todo方法
    updateTodo(id, completed) {
      const todo = this.todos.find((todo) => todo.id === id);
      todo.completed = completed;
    },
    addTodo(name){
      this.todos.unshift({id: Date.now(), name, completed:false });
    },
    //删除todo
    delTodo(id){
      this.todos = this.todos.filter((todo) => todo.id !=== id);
    },
    //全选全不选
    handleSelectAll(isSelectAll){
      this.todos.forEach((todo) => {
        todo.completed = isSelectAll;
      });
    },
    delCompletedTodo(){
      this.todos = this.todos.filter((todo) => !todo.completed);
    },
  },
  watch:{
    todos:{
      deep: true,
      handler(val){
        window.localStorage.setItem("todos", JSON.stringify(val));
      },
    },
  },
  components: {
    Item,
  },
};
</script>

<style scoped>
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
