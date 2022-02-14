<template>
  <div class="shadow-post px-3 md:px-5 py-10 w-full md:rounded-3xl">
    <!-- Card top  -->
    <div class="flex justify-between items-center pb-3">
      <router-link
        :to="me && userId == me.id ? '/account-page' : `/profile/${userId}`"
        class="flex items-center space-x-4"
      >
        <img :src="userImage" class="h-10 rounded-full" :alt="username" />
        <p class="text-gray-600">{{ username }}</p>
      </router-link>
      <!-- Category -->
      <router-link
        :to="'/' + postObject.category"
        class="flex items-center space-x-3"
      >
        <img
          class="h-10"
          :src="
            'https://cdn.quentinrobert.fr/yowl/icons/' +
            postObject.category +
            '.svg'
          "
          :alt="postObject.category + ' icon'"
        />
        <p class="text-gray-600 text-lg">{{ postObject.category }}</p>
      </router-link>
    </div>
    <div class="space-y-2">
      <h1 class="text-2xl font-bold">{{ postObject.title }}</h1>
      <div
        class="
          flex flex-col
          items-center
          md:items-start
          justify-center
          md:justify-start md:flex-row
        "
      >
        <a :href="postObject.source" target="_blank" class="w-full md:w-7/12">
          <img
            :src="postObject.imageLink"
            class="object-cover w-full"
            style="aspect-ratio: 16 / 9"
            alt="The post's image"
          />
        </a>
        <p
          class="
            max-h-40
            md:px-5 md:max-h-40
            lg:max-h-72
            md:w-1/2 md:block
            hidden
            overflow-y-scroll
          "
        >
          <!-- Opinion -->
          <span :id="'post-' + postObject.id">{{
            postObject.opinion.slice(0, 550)
          }}</span>
          <!-- ... -->
          <span v-if="postObject.opinion.length > 550 && !opinionExpanded"
            >...</span
          >
          <!-- See more -->
          <br />
          <label
            @click="seeLess(postObject.id)"
            class="text-action-color font-bold cursor-pointer"
            v-if="opinionExpanded"
            >See less</label
          >
          <label
            @click="seeMore(postObject.id)"
            class="text-action-color font-bold cursor-pointer"
            v-else-if="postObject.opinion.length > 550"
            >See more</label
          >
        </p>
        <p
          class="
            max-h-40
            md:px-5 md:max-h-40
            lg:max-h-80
            overflow-y-scroll
            md:hidden
            pt-3
          "
        >
          <!-- Opinion -->
          <span :id="'post-phone-' + postObject.id">{{
            postObject.opinion.slice(0, 300)
          }}</span>
          <!-- ... -->
          <span v-if="postObject.opinion.length > 300 && !opinionExpanded"
            >...</span
          >
          <!-- See more -->
          <br />
          <label
            @click="seeLessPhone(postObject.id)"
            class="text-action-color font-bold cursor-pointer"
            v-if="opinionExpanded"
            >See less</label
          >
          <label
            @click="seeMorePhone(postObject.id)"
            class="text-action-color font-bold cursor-pointer"
            v-else-if="postObject.opinion.length > 300"
            >See more</label
          >
        </p>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row lg:justify-between mt-5">
      <!-- boutons -->
      <div class="space-x-3 flex">
        <button
          @click="upvote"
          class="flex items-center px-2 py-2 rounded-md space-x-2"
        >
          <UisArrowCircleUp
            size="28"
            class="text-action-color"
            v-if="upvoted"
          />
          <UilArrowCircleUp size="28" class="" v-else />
          <p>{{ upvotes }}</p>
        </button>
        <button
          @click="downvote"
          class="flex items-center px-2 py-2 rounded-md space-x-2"
        >
          <UisArrowCircleUp
            size="28"
            class="text-action-color transform rotate-180"
            v-if="downvoted"
          />
          <UilArrowCircleUp size="28" class="transform rotate-180" v-else />
          <p>{{ downvotes }}</p>
        </button>
        <button
          @click="showComs"
          class="flex items-center px-2 py-2 rounded-md space-x-2"
        >
          <UilCommentLines size="28" />
          <p v-if="postObject.comments">{{ postObject.comments.length }}</p>
        </button>
        <button @click="save" class="flex items-center px-2 py-2 rounded-md">
          <UisBookmark size="28" class="text-action-color" v-if="saved" />
          <UilBookmark size="28" class="" v-else />
        </button>
      </div>

      <a
        :href="postObject.source"
        target="_blank"
        class="
          mt-5
          items-center
          lg:mt-0
          w-40
          text-center
          lg:w-auto
          bg-action-color
          text-white
          px-2
          py-2
          rounded-md
          flex
          justify-center
        "
        >On {{ postObject.site }}</a
      >
    </div>
    <div class="mt-5 hidden" :id="'coms-' + postObject.id">
      <hr class="mt-10 mb-5 w-11/12 mx-auto" />
      <h4 class="text-xl pb-2">Comments :</h4>
      <div class="max-h-36 overflow-y-scroll">
        <!-- V FOR ICI -->
        <div
          class="mt-5 space-y-2"
          v-for="comment in postObject.comments"
          v-bind:key="comment.id"
        >
          <comment :comment="comment" />
          <!-- <div class="flex space-x-2">
            <img
              :src="comment.user_avatar"
              alt="avatar"
              class="h-7 w-7 rounded-full"
            />
            <p class="font-bold">{{ comment.username }}</p>
            <p>{{ comment.opinion }}</p>
            <button
              @click="upvoteComment"
              class="flex items-center px-2 py-2 rounded-md space-x-2"
            >
              <UisArrowCircleUp
                size="28"
                class="text-action-color"
                v-if="comment"
              />
              <UilArrowCircleUp size="28" class="" v-else />
              <p>{{ upvotes }}</p>
            </button>
          </div> -->
        </div>
      </div>
      <form class="mt-3" @submit.prevent="addComment">
        <span
          class="
            w-full
            h-10
            flex
            bg-action-color
            cursor-pointer
            border border-action-color
            text-sm
            rounded-full
            md:flex
          "
        >
          <input
            type="text"
            name="comment"
            id="comment-box"
            v-model="comment"
            placeholder="My comment here..."
            class="
              flex-grow
              px-4
              rounded-l-full rounded-r-full
              text-sm
              focus:outline-none
            "
          />
          <!-- <i class="fas fa-search m-3 mr-5 text-lg text-white w-4 h-4"> </i> -->
          <img
            @click="addComment"
            src="https://cdn.quentinrobert.fr/yowl/icons/Send.svg"
            alt="Send icon"
            class="m-2.5 mr-5 text-lg text-white w-5 h-5"
          />
        </span>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { api_url } from "../../config.json";
import { UilArrowCircleUp } from "@iconscout/vue-unicons";
import { UisArrowCircleUp } from "@iconscout/vue-unicons-solid";
import { UilBookmark } from "@iconscout/vue-unicons";
import { UisBookmark } from "@iconscout/vue-unicons-solid";
import { UilCommentLines } from "@iconscout/vue-unicons";
import Comment from "./Comment.vue";

export default {
  name: "Post",
  props: ["post"],
  components: {
    UilArrowCircleUp,
    UisArrowCircleUp,
    UilBookmark,
    UisBookmark,
    UilCommentLines,
    Comment,
  },
  data() {
    return {
      userImage: "",
      username: "",
      userId: null,
      saved: false,
      me: null,
      upvoted: false,
      downvoted: false,
      upvotes: 0,
      downvotes: 0,
      opinionExpanded: false,
      comment: "",
      postObject: null,
    };
  },
  methods: {
    showComs() {
      document
        .getElementById("coms-" + this.postObject.id.toString())
        .classList.toggle("hidden");
      return;
    },
    seeMore(id) {
      document.getElementById(`post-${id}`).innerHTML = this.postObject.opinion;
      this.opinionExpanded = true;
      return;
    },
    seeLess(id) {
      document.getElementById(`post-${id}`).innerHTML =
        this.postObject.opinion.slice(0, 550);
      this.opinionExpanded = false;
      return;
    },
    seeMorePhone(id) {
      document.getElementById(`post-phone-${id}`).innerHTML =
        this.postObject.opinion;
      this.opinionExpanded = true;
      return;
    },
    seeLessPhone(id) {
      document.getElementById(`post-phone-${id}`).innerHTML =
        this.postObject.opinion.slice(0, 300);
      this.opinionExpanded = false;
      return;
    },
    async addComment() {
      if (!sessionStorage.getItem("token")) return this.$router.push("/login");
      let comment = { opinion: this.comment };
      let response = await axios.post(
        `${api_url}/comments/${this.postObject.id}`,
        comment,
        { headers: { Authorization: `Bearer ${sessionStorage.token}` } }
      );
      this.postObject = response.data;
      this.upvotes = this.postObject.upVotes;
      this.downvotes = this.postObject.downVotes;

      let user = JSON.parse(sessionStorage.getItem("user"));
      this.me = user;

      this.postObject.comments.map(async (comment) => {
        let response = await axios.get(`${api_url}/users/${comment.user}`);
        comment.username = response.data.username;
        comment.user_avatar = response.data.avatar_url;
      });

      axios
        .get(`${api_url}/users/${this.postObject.user}`)
        .then((response) => {
          this.userImage = response.data.avatar_url;
          this.username = response.data.username;
          this.userId = response.data.id;
          return;
        })
        .catch((err) => {
          console.log(err);
        });
      if (this.me) {
        axios
          .get(`${api_url}/posts/${this.postObject.id}/saved`, {
            headers: { Authorization: `Bearer ${this.me.jwt}` },
          })
          .then((response) => {
            this.saved = response.data;
          })
          .catch((err) => {
            console.log(err);
          });

        axios
          .get(`${api_url}/posts/${this.postObject.id}/upvoted`, {
            headers: { Authorization: `Bearer ${this.me.jwt}` },
          })
          .then((response) => {
            this.upvoted = response.data;
          })
          .catch((err) => {
            console.log(err);
          });

        axios
          .get(`${api_url}/posts/${this.postObject.id}/downvoted`, {
            headers: { Authorization: `Bearer ${this.me.jwt}` },
          })
          .then((response) => {
            this.downvoted = response.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
      this.comment = "";
      document.getElementById("comment-box").innerHTML = "";
      return;
    },
    async upvote() {
      if (!this.me) return this.$router.push("/login");
      let response = await axios.post(
        `${api_url}/posts/${this.postObject.id}/upvote`,
        {},
        { headers: { Authorization: `Bearer ${this.me.jwt}` } }
      );
      this.downvoted ? this.downvotes-- : "";
      this.upvoted = response.data.upvote;
      this.downvoted = response.data.downvote;
      this.upvoted ? this.upvotes++ : this.upvotes--;
    },
    async downvote() {
      if (!this.me) return this.$router.push("/login");
      let response = await axios.post(
        `${api_url}/posts/${this.postObject.id}/downvote`,
        {},
        { headers: { Authorization: `Bearer ${this.me.jwt}` } }
      );
      this.upvoted ? this.upvotes-- : "";
      this.downvoted = response.data.downvote;
      this.upvoted = response.data.upvote;
      this.downvoted ? this.downvotes++ : this.downvotes--;
    },
    async save() {
      if (!this.me) return this.$router.push("/login");
      let response = await axios.post(
        `${api_url}/posts/${this.postObject.id}/save`,
        {},
        { headers: { Authorization: `Bearer ${this.me.jwt}` } }
      );
      this.saved = response.data;
    },
  },
  beforeMount() {
    this.postObject = this.post;
  },
  mounted() {
    this.upvotes = this.postObject.upVotes;
    this.downvotes = this.postObject.downVotes;

    let user = JSON.parse(sessionStorage.getItem("user"));
    this.me = user;

    if (this.postObject.comments.length > 0) {
      this.postObject.comments.map(async (comment) => {
        let response = await axios.get(`${api_url}/users/${comment.user}`);
        comment.username = response.data.username;
        comment.user_avatar = response.data.avatar_url;
      });
    }

    axios
      .get(`${api_url}/users/${this.postObject.user}`)
      .then((response) => {
        this.userImage = response.data.avatar_url;
        this.username = response.data.username;
        this.userId = response.data.id;
        return;
      })
      .catch((err) => {
        console.log(err);
      });
    if (this.me) {
      axios
        .get(`${api_url}/posts/${this.postObject.id}/saved`, {
          headers: { Authorization: `Bearer ${this.me.jwt}` },
        })
        .then((response) => {
          this.saved = response.data;
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(`${api_url}/posts/${this.postObject.id}/upvoted`, {
          headers: { Authorization: `Bearer ${this.me.jwt}` },
        })
        .then((response) => {
          this.upvoted = response.data;
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(`${api_url}/posts/${this.postObject.id}/downvoted`, {
          headers: { Authorization: `Bearer ${this.me.jwt}` },
        })
        .then((response) => {
          this.downvoted = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>