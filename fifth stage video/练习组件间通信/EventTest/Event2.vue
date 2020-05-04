<template>
  <div>
    <h2>Event2</h2>
    <button @click="$emit('click', 'atguigu')">自定义click事件</button><br />
    <button @click="$emit('xxx', {m: 1})">自定义xxx事件</button><br />
  </div>
</template>

<script>
export default {};
</script>

<style></style>
