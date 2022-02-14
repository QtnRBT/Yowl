<template>
  <div class="home h-screen bg-white">
    <button-add :categories="categories" :currentCat="currentCategory" @addedPost="getAddedPost"></button-add>
    <div class="">
      <navBar class="fixed z-20" :user="me"></navBar>
      <sideBar
        v-if="categories.length > 0"
        :categories="categories"
        class="md:fixed lg:mt-top-nav md:mt-12 absolute z-20"
      ></sideBar>
    </div>
    <div>
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
        <div class="hidden relative lg:flex items-end justify-between h-36 bg-gris-mais-beaucoup w-full ">
        <!-- Titre de category -->
          <!-- <img
            :src="
              'https://cdn.quentinrobert.fr/yowl/icons/' +
              this.currentCategory +
              '.png'
            "
            alt=""
          /> -->
         
           <div class="
              pl-4
              bg-transparent
              textfont
              uppercase
              font-bold
              text-white
              self-start
              mt-6
              "> {{ currentCategory }}
              <!-- <img src = `../assets/icons/Icon_${currentCategory}.png`> -->
            </div>
         
           <div class="flex flex-col text-white px-5 pt-3">
            <div class="py-1 text-lg">
                Posts in this category :
                <span class="text-xl uppercase font-bold" v-if="posts">
                  {{posts.length}}
                </span>
            </div>
          </div>
        </div>

        <h1 v-if="nopost" class="text-3xl font-bold sm:pt-10 lg:pt-20">There are currently no posts in this category.</h1>

        <div class="space-y-10 py-10 md:py-5 w-full md:px-10 flex flex-col items-center" v-if="posts">
          <post :post="postItem" v-for="postItem in posts" v-bind:key="postItem.id"></post>
        </div>
        <div v-else class="flex justify-center items-center h-screen -mt-top-category">
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
  name: "Categories",
  components: { navBar, sideBar, post, buttonAdd },
  data() {
    return {
      posts: null,
      categories: [],
      me: {},
      currentCategory: "",
      nopost: false,
    };
  },
  methods: {
    getAddedPost() {
      location.reload();
      return
    }
  },
  watch: {
    $route(to) {
      this.currentCategory = to.name.toUpperCase();
      axios
      .get(api_url + "/posts/cat/" + this.currentCategory.toLowerCase())
      .then((result) => {
        this.nopost = false;
        this.posts = result.data;
      })
      .catch((err) => {
        console.log("There was an error !" + err);
        if(err.response.status == 404) return (this.nopost = true, this.posts = []);
      });
    },
  },
  mounted() {
    this.currentCategory = this.$route.name.toUpperCase();

    let user = JSON.parse(sessionStorage.getItem("user"));
    this.me = user;
    axios
      .get(api_url + "/posts/cat/" + this.currentCategory.toLowerCase())
      .then((result) => {
        this.nopost = false;
        this.posts = result.data;
      })
      .catch((err) => {
        console.log("There was an error !" + err);
        if(err.response.status == 404) return (this.nopost = true, this.posts = []);
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

<style scoped>
    .textfont {
      font-size: 110px;
    }

    @media screen and (min-width: 1020px) and (max-width: 1055px) {
      .textfont {
        font-size: 70px;
        margin-top: 4.3rem;
      }
    }

    @media screen and (min-width: 1055px) and (max-width: 1260px) {
      .textfont {
        font-size: 80px;
        margin-top: 3.7rem;
      }
    }
</style>

