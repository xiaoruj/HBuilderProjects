<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isSelectAll" />
    </label>
    <span>
      <span>已完成{{ completedLength }}</span> / 全部{{ todos.length }}
    </span>
    <button
      class="btn btn-danger"
      v-show="!!completedLength"
      @click="handleDel"
    >
      清除已完成任务
    </button>
  </div>
</template>

<script>
export default {
  props: {
    todos: Array,
    handleSelectAll: Function,
    delCompletedTodo: Function,
  },
  methods: {
    handleDel() {
      if (window.confirm("你确定要删除已选中的数据吗？")) {
        this.delCompletedTodo();
      }
    },
  },
  computed: {
    completedLength() {
      let length = 0;
      this.todos.forEach((todo) => {
        if (todo.completed) {
          length++;
        }
      });
      return length;
    },
    isSelectAll: {
      get() {
        return (
          this.completedLength === this.todos.length && this.completedLength > 0
        );
      },
      set(val) {
        this.handleSelectAll(val);
      },
    },
  },
};
</script>

<style scoped>
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
