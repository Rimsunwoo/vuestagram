<template>
  <div class="header">
    <ul class="header-button-left">
      <li @click="clickCancel">Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li @click="clickNext">Next</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>
  <Container
    :postData="postData"
    :step="step"
    :uploadImg="uploadImg"
    :choiceFilter="filter"
    @postText="message = $event"
  />

  <button @click="clickMore" v-if="step == 0">더보기</button>

  <div class="footer">
    <ul class="footer-button-plus">
      <input
        @change="fileUpload"
        accept="image/*"
        type="file"
        id="file"
        class="inputfile"
      />
      <label for="file" class="input-plus" v-if="step == 0">+</label>
    </ul>
  </div>
</template>

<script>
import Container from "./components/Container.vue";
import postData from "../src/assets/postData";
import axios from "axios";

export default {
  data() {
    return {
      postData,
      clickNum: 0,
      step: 0,
      uploadImg: "",
      filter: "",
      message: "",
    };
  },
  name: "App",
  components: {
    Container,
  },
  methods: {
    clickMore() {
      axios
        .get(`https://codingapple1.github.io/vue/more${this.clickNum}.json`)
        .then((result) => {
          this.postData.push(result.data);
          this.clickNum = this.clickNum == 1 ? 0 : 1;
        });
    },
    fileUpload(e) {
      let a = e.target.files;
      let imgUrl = URL.createObjectURL(a[0]);
      this.uploadImg = imgUrl;
      this.step++;
    },
    clickNext(e) {
      let newPostData = {
        name: "Guest",
        userImage: "",
        postImage: this.uploadImg,
        likes: 0,
        date: "",
        liked: false,
        content: this.message,
        filter: this.filter,
      };
      if (this.step == 1) {
        this.step++;
        e.target.innerText = "Upload";
      } else if (this.step == 2) {
        this.postData.unshift(newPostData);
        e.target.innerText = "Next";
        this.step = 0;
      }
    },
    clickCancel() {
      if (this.step != 0) this.step--;
    },
  },
  mounted() {
    this.emitter.on("changeFilter", (a) => {
      this.filter = a;
    });
  },
};
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  z-index: 1;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
