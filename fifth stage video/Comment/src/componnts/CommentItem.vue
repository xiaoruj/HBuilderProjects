<template>
  <li class="list-group-item">
    <div id="handle">
      <a href="javascript:;" @click.prevent="handleDel">删除</a>
    </div>
    <p class="user">
      <span>{{ comment.name }}</span
      ><span>说:</span>
    </p>
    <p class="centence">{{ comment.content }}</p>
  </li>
</template>

<script>
export default {
  props: {
    comment: Object,
  },
  methods: {
    handleDel() {
      if (window.confirm(`您确定要删除评论吗？`)) {
        this.delComment("del-comment", this.comment.id);
      }
    },
  },
};
</script>

<style scoped>
li {
  transition: 0.5s;
  overflow: hidden;
}
.handle {
  width: 40px;
  border: 1px solid #ccc;
  background: #fff;
  position: absolute;
  right: 10px;
  top: 1px;
  text-align: center;
}
.hand a {
  display: block;
  text-decoration: none;
}
.list-group-item .centence {
  padding: 0px 50px;
}
.user {
  font-size: 22px;
}
</style>
