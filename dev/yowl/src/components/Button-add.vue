<template>
  <div class="">
    <!-- Popup en absolute -->
    <div
      class="
        z-40
        top-0
        left-0
        w-screen
        h-screen
        flex flex-row
        justify-center
        items-center
        fixed
        hidden
        overflow-y-hidden
      "
      id="popup"
    >
      <div
        class="absolute bg-black opacity-40 left-0 right-0 top-0 bottom-0 z-30"
        @click="addNew()"
      ></div>

      <!-- Form -->
      <form
        class="flex flex-col w-86 md:w-auto bg-white rounded-3xl p-10 absolute space-y-4 z-40"
        @submit.prevent="publish()"
      >
        <div class="flex justify-center items-center pb-3 space-x-2">
          <h1 class="text-center text-3xl font-semibold text-gray-600">
            Add a post
          </h1>
        </div>
        <!-- Top form -->
        <div class="flex flex-row">
          <div class="flex w-full justify-between space-x-5">
            <input
              type="text"
              required
              name="title"
              v-model="title"
              id="title"
              class="
                peer
                bg-indigo-50
                px-4
                py-2
                outline-none
                rounded-md
                w-3/6
                md:w-4/6
                h-10
                border-gray-300
                text-gray-900
                focus:outline-none
              "
              placeholder="Your title"
            />
            <Dropdown :currentCat="currentCat" @currentCategory="getCurrentCategory" :categories="categories"></Dropdown>
          </div>
        </div>
        <textarea
          required
          name="opinion"
          v-model="aupinard"
          class="
            w-full
            md:w-120
            h-40
            md:h-60
            resize-none
            peer
            bg-indigo-50
            px-4
            py-2
            outline-none
            rounded-md
            border-gray-300
            text-gray-900
            focus:outline-none
          "
          placeholder="Your opinion here..."
        ></textarea>

        <!-- Bottom form -->
        <div class="flex space-x-5">
          <input
            required
            v-model="source"
            name="source"
            type="text"
            placeholder="The link of the thing here"
            class="
              peer
              bg-indigo-50
              px-4
              py-2
              outline-none
              rounded-md
              w-4/6
              h-10
              border-gray-300
              text-gray-900
              focus:outline-none
            "
          />
          <input
            type="submit"
            class="
              w-2/6
              bg-action-color
              px-5
              py-2
              rounded-md
              text-white
              hover:bg-action-color-hover
              cursor-pointer
            "
            value="Publish"
          >
        </div>
      </form>
    </div>
    <!-- Bouton add -->
    <div class="right-0 bottom-0 z-50 md:m-10 m-5 fixed">
      <button
        @click="addNew()"
        class="bg-action-color hover:bg-action-color-hover rounded-full p-5 w-14 h-14 shadow-add"
      >
        <img src="https://cdn.quentinrobert.fr/yowl/icons/Icon_add.png" id="add" class="transition duration-200 ease-in-out transform scale-150" alt="Add icon">
        </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { api_url } from '../../config.json';

import Dropdown from "../components/Dropdown-categories.vue";

export default {
  name: "Button-add",
  components: {Dropdown},
  data() {
    return {
      currentCategory: null,
      title: "",
      aupinard: "",
      source: ""
    }
  },
  mounted() {
    if(this.currentCat) this.currentCategory = this.currentCat;
  },
  methods: {
    addNew() {
      document.getElementById("popup").classList.toggle("hidden");
      document.getElementById("add").classList.toggle("rotate-45");
      return;
    },
    getCurrentCategory(value) {
      this.currentCategory = value;
      return;
    },
    async publish() {

      if(!sessionStorage.getItem("token")) this.$router.push("/login");

      let category = (this.currentCategory);
      let title = this.title;
      let aupinard = this.aupinard;
      let source = this.source;

      let post = {
        title: title,
        opinion: aupinard,
        category: category,
        source_url: source
      }

      let header = {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
      }

      try {
        let response = await axios.post(`${api_url}/posts`, post, {headers: header});
        this.$emit("addedPost", response.data);
      } catch(err) {
        console.log(err);
        return;
      }

      // get value from title

      // get value from opinion

      // get value from source
    }
  },
  props: ["categories", "currentCat"]
};
</script>