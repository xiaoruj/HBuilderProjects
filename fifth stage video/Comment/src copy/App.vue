<template>
  <div>
    <header class="site-header jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h1>请发布对《我在北京等你》的评论</h1>
          </div>
        </div>
      </div>
    </header>
    <div id="container">
      <AddComment :addComment="addComment" />
      <CommentList :comments="comments" :delComment="delComment" />
    </div>
  </div>
</template>

<script>
import AddComment from "@comps/AddComment";
import CommentList from "@CommentList";
export default {
  data() {
    return {
      comments: [
        { id: 1, name: "李易峰", content: "我在北京等你" },
        { id: 2, name: "杨紫", content: "亲爱的热爱的" },
      ],
    };
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
    AddComment,
    CommentList,
  },
};
</script>

<style></style>
