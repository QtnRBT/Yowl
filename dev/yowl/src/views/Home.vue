<template>
  <div class="home h-screen">
    <button-add :categories="categories" @addedPost="getAddedPost"></button-add>
    <div class="">
      <navBar class="fixed z-50" :user="me"></navBar>
      <sideBar
        v-if="categories.length > 0"
        :categories="categories"
        class="md:fixed lg:mt-top-nav md:mt-12 absolute md:active"
      ></sideBar>
    </div>

    <div>
      
      <div
        class="lg:pt-top-nav md:pt-top-nav md:pl-side-bar pt-top-nav w-full flex flex-col items-center"
        id="posts"
      >
        <!-- Titre de category -->
        <!-- V for posts -->
        <div class="space-y-10 py-10 md:py-5 md:px-10 flex flex-col items-center" v-if="posts">
          <post :post="postItem" v-for="postItem in posts" v-bind:key="postItem.id"></post>
        </div>
        <div v-else class="flex justify-center items-center h-screen -mt-top-nav">
          <img src="https://cdn.quentinrobert.fr/yowl/loader-loop.gif" alt="logo Yowl" class="w-96">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "../components/Nav-bar.vue";
import sideBar from "../components/Side-bar.vue";
import axios from "axios";
import { api_url } from "../../config.json";
import post from "../components/Post.vue";
import buttonAdd from "../components/Button-add.vue";

export default {
  name: "Home",
  components: { navBar, sideBar, post, buttonAdd },
  data() {
    return {
      posts: null,
      categories: [],
      me: {},
    };
  },
  methods: {
    getAddedPost() {
      location.reload();
      return
    }
  },
  mounted() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    this.me = user;
    axios
      .get(api_url + "/posts")
      .then((result) => {
        this.posts = result.data;
      })
      .catch((err) => {
        console.log("There was an error !" + err);
      });

    axios
      .get(api_url + "/categories")
      .then((result) => {
        this.categories = result.data;
      })
      .catch((err) => {
        console.log("There was an error !" + err);
      });

    // Pas besoin de faire un get de user normalement on a tout dans user
    // user
    //   ? axios
    //       .get(api_url + "/users/" + user.id)
    //       .then((result) => {
    //         this.me = result.data;
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       })
    //   : "";
  },
};
</script>
<style>
.opened {
  width: calc(100vw - 256px);
  left: 256px;
}

.closed {
  width: 100vw;
  left: 0;
}
</style>