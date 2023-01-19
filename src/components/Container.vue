<template>
  <div>
    <Post v-for="(data, i) in postData" :key="i" :postData="data"></Post>
  </div>
</template>

<script>
import Post from "./Post.vue";
export default {
  components: {
    Post,
  },
  data() {
    return {
      postData: this.postData,
    };
  },
  props: {
    postData: Array,
  },
};
</script>

<style></style>
