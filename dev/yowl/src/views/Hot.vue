<template>
  <div class="home h-screen">
    <button-add :categories="categories" @addedPost="getAddedPost"></button-add>
    <div class="">
      <navBar class="fixed z-50" :user="me"></navBar>
      <sideBar
        v-if="categories.length > 0"
        :categories="categories"
        class="md:fixed lg:mt-top-nav md:mt-12 absolute"
      ></sideBar>
    </div>
    <div
        class="
          lg:pt-top-nav
          md:pt-top-nav md:pl-side-bar
          pt-top-nav
          w-full
          flex flex-col
          items-center
          absolute
          z-0
        "
        id="posts"
      >
    <div
      class="
        space-y-10
        py-10
        md:py-5
        w-full
        md:px-10
        flex flex-col
        items-center
      "
    >
      <h1 class="text-4xl">Work In Progress</h1>
    </div>
    <!-- <div
      class="
        absolute
        top-12
        h-10
        w-screen
        md:ml-64 md:pt-top-nav md:flex md:justify-center
      "
    > 
    </div> -->
  </div>
  </div>
</template>

<script>
import navBar from "../components/Nav-bar.vue";
import sideBar from "../components/Side-bar.vue";
import axios from "axios";
import { api_url } from "../../config.json";
import buttonAdd from "../components/Button-add.vue";

export default {
  name: "Hot",
  components: { navBar, sideBar, buttonAdd },
  data() {
    return {
      posts: [],
      categories: [],
      me: {},
    };
  },
  methods: {
    getAddedPost() {
      location.reload();
      return;
    },
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
  },
};
</script>
