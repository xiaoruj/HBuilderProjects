<template>
  <li
    @mouseenter="handleEnter(true)"
    @mouseleave="handleEnter(false)"
    :style="{ backgroundColor: bgColor }"
  >
    <label>
      <input type="checkbox" v-model="isCompleted" />
      <span>{{ todo.name }}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="handleDel">
      删除
    </button>
  </li>
</template>

<script>
export default {
  props: {
    todo: Object,
    updateTodo: Function,
    delTodo: Function,
  },
  data() {
    return {
      bgColor: "#fff",
      isShow: false,
    };
  },
  methods: {
    handleEnter(isEnter) {
      this.isShow = isEnter;
      this.bgColor = isEnter ? "#ccc" : "#fff";
    },
    handleDel() {
      if (window.confirm("你确定要删除当前todo数据吗？")) {
        this.delTodo(this.todo.id);
      }
    },
  },
  computed: {
    isCompleted: {
      get() {
        return this.todo.completed;
      },
      set(val) {
        this.updateTodo(this.todo.id, val);
      },
    },
  },
};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  /* display: none; */
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>
