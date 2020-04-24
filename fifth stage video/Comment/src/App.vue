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
        { id: 1, name: "anny", content: "I love liyifeng" },
        { id: 2, name: "rose", content: "I love Anny" },
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
