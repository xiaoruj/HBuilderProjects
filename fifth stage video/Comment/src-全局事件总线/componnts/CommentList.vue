<template>
  <div id="col-md-8">
    <h3 class="reply">评论回复:</h3>
    <h2 v-show="comments.length === 0">暂无评论，点击左侧添加评论</h2>
    <ul class="list-group">
      <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
    </ul>
  </div>
</template>

<script>
import CommentItem from "@comps/CommentItem";
export default {
  data() {
    return {
      comments: [
        { id: 2, name: "李易峰", content: "我在北京等你" },
        { id: 1, name: "杨紫", content: "亲爱的热爱的" },
      ],
    };
  },
  mounted() {
    this.$bus.$on("add-comment", this.addComment);
    this.$bus.$on("del-comment", this.delComment);
  },
  beforeDestory() {
    this.$bus.$off("add-comment", this.addComment);
    this.$bus.$off("del-comment", this.delComment);
  },
  methods: {
    addComment(comment) {
      this.comments.unshift(comment);
    },
    delComment(id) {
      this.comments = this.comments.filter((comment) => comment.id !== id);
    },
  },
  components: {
    CommentItem,
  },
};
</script>

<style scoped>
.reply {
  margin-top: 0px;
}
</style>
