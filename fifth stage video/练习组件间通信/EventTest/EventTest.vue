<template>
  <div>
    <h1>EventTest组件</h1>
    <button @click="test1">测试原生事件</button>
    <hr />
    <Event1 @click.native="test2($event)" />
    <hr />
    <Event2 @click="test3" @xxx="test3($event)"/>
  </div>
</template>

<script type="text/ecmascript-6">
import Event1 from "./Event1.vue"
import Event2 from "./Event2.vue"
export default {
    components: {
        Event1,
        Event2,
    },
    methods:{
        test1 (event){
            alert(event.target.innerHTML)
        },
        test2 (event){
            alert(event.target.innerHTML)
        },
        test3 (data){
            alert('响应自定义事件,' + data)
        },
    }
}
</script>

<style></style>
