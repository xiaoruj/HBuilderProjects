<template>
  <div>
    <h1 v-if="isLoading">loading</h1>
    <h1 v-else>
      most start repo is <a :href="repo.url">{{ repo.name }}</a>
    </h1>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isLoading: false,
      repo: {
        name: "",
        url: "",
      },
    };
  },
  async created() {
    this.isLoading = true;
    const path = `http://localhost:9527/api/search`;
    const response = await axios.get(path);
    const { name, url } = response.data.data[0];
    this.repo = {
      name,
      url,
    };
    this.isLoading = false;
  },
};
</script>

<style></style>
