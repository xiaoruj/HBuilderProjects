<template>
  <div>
    <p v-if="isFirstView">请输入搜索内容</p>
    <p v-else-if="isLoading">Loading</p>
    <div class="row" v-else-if="users">
      <div class="card" v-for="(user, index) in users" :key="index">
        <a :href="user.html_url" target="-blank">
          <img :src="user.avatar_url" style="width: 100px;" />
        </a>
        <p class="card-text">{{ user.login }}</p>
      </div>
    </div>
    <p v-else>{{ errorMsg }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
    data(){
        return {
            // 决定是否初始化显示
            isFirstView: true,
            // 决定是否在请求中
            isLoading: false,
            // 决定请求成功的数据
            users: null,
            // 决定请求失败的信息
            errorMsg: "",
        };
    },
    created(){
        this.$bus.$on("search-name", this.reqUsersData);
    },
    methods(){
        async reqUsersData(searchName){
            this.isFirstView = false;
            this.isLoading = true;
            try{
                // 发送请求
                const response = await axios.get(
                    `/api/search/users?q=${searchName}`
                );
                // 长度不变，值变用msp
                const users = response.data.items.map((user) => {
                    return {
                        login: user.login,
                        html_url: user.html_url,
                        avatar_url: user.avatar_url,
                    };
                });
            } catch (e){
                console.log(e);
                this.users = null;
                this.isLoading = false;
                this.errorMsg = "您的网络出了问题，请刷新重试";
            }
        },
    },
};
</script>

<style scoped>
.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>
