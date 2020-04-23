<template>
  <div id="col-md-8">
    <h3 class="reply">评论回复:</h3>
    <h2 style="dispaly: none">暂无评论，点击左侧添加评论</h2>
    <ul class="list-group">
      <CommentItem />
    </ul>
  </div>
</template>

<script>
import CommentItem from "@comps/CommentItem";
export default {
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
