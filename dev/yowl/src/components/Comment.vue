<template>
  <div class="flex justify-between items-center">
    <div class="flex space-x-2">
      <img
        :src="comment.user_avatar"
        alt="avatar"
        class="h-7 w-7 rounded-full"
      />
      <p class="font-bold">{{ comment.username }}</p>
      <p>{{ comment.opinion }}</p>
    </div>
    <div class="flex">
      <button
        @click="upvoteComment(comment.id)"
        class="flex items-center px-2 py-2 rounded-md space-x-2"
      >
        <UisArrowCircleUp size="28" class="text-action-color" v-if="upvoted" />
        <UilArrowCircleUp size="28" class="" v-else />
        <p>{{ upvotes }}</p>
      </button>
      <button
        @click="downvoteComment(comment.id)"
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { api_url } from "../../config.json";
import { UilArrowCircleUp } from "@iconscout/vue-unicons";
import { UisArrowCircleUp } from "@iconscout/vue-unicons-solid";

export default {
  name: "Comment",
  components: { UisArrowCircleUp, UilArrowCircleUp },
  data() {
    return {
      upvoted: null,
      downvoted: null,
      upvotes: 0,
      downvotes: 0,
      me: null,
    };
  },
  async mounted() {
    this.upvotes = this.comment.upvotes;
    this.downvotes = this.comment.downvotes;
    let user = JSON.parse(sessionStorage.getItem("user"));
    this.me = user;
    if(this.me) {
      axios
        .get(`${api_url}/comments/upvoted/${this.comment.id}`, {
          headers: { Authorization: `Bearer ${this.me.jwt}` },
        })
        .then((response) => {
          this.upvoted = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
  
      axios
        .get(`${api_url}/comments/downvoted/${this.comment.id}`, {
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
  methods: {
    async upvoteComment(id) {
      if (!this.me) return this.$router.push("/login");
      let response = await axios.post(
        `${api_url}/comments/upvote/${id}`,
        {},
        { headers: { Authorization: `Bearer ${this.me.jwt}` } }
      );
      this.downvoted ? this.downvotes-- : "";
      this.upvoted = response.data.upvote;
      this.downvoted = response.data.downvote;
      this.upvoted ? this.upvotes++ : this.upvotes--;
    },
    async downvoteComment(id) {
      console.log(id);
      if (!this.me) return this.$router.push("/login");
      let response = await axios.post(
        `${api_url}/comments/downvote/${id}`,
        {},
        { headers: { Authorization: `Bearer ${this.me.jwt}` } }
      );
      this.upvoted ? this.upvotes-- : "";
      this.downvoted = response.data.downvote;
      this.upvoted = response.data.upvote;
      this.downvoted ? this.downvotes++ : this.downvotes--;
    },
  },
  props: ["comment"],
};
</script>