<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo" />
      <List :todos="todos" :updateTodo="updateTodo" :delTodo="delTodo" />
      <Footer
        :todos="todos"
        :handleSelectAll="handleSelectAll"
        :delCompletedTodo="delCompletedTodo"
      />
    </div>
  </div>
</template>

<script>
import Header from "@comps/Header";
import List from "@comps/List";
import Footer from "@comps/Footer";
export default {
  data() {
    return {
      todos: JSON.parse(window.localStorage.getItem("todos")) || [],
    };
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
    Header,
    List,
    Footer,
  },
};
</script>

<style scoped>
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
