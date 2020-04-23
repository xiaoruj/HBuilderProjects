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
      <AddComment />
      <CommentList />
    </div>
  </div>
</template>

<script>
import AddComment from "@comps/AddComment";
import CommentList from "@CommentList";
export default {
  component: {
    AddComment,
    CommentList,
  },
};
</script>

<style></style>
