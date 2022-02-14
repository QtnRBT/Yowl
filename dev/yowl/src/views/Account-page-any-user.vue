<template>
  <div class="home h-screen">
    <navBar class="md:fixed md:block hidden z-50" :user="me"></navBar>

    <!-- mobile part  -->
    <div class="md:hidden" v-if="him">
      <div class="flex justify-between w-full pt-7 px-10">
        <a href=" / "
          ><img
            src="https://cdn.quentinrobert.fr/yowl/icons/Icon_home.png"
            class="h-7 w-7 content-end"
        /></a>
        <Menu as="div" class="relative text-left">
          <div>
            <MenuButton
              class="flex h-full text-sm font-medium text-white rounded-md"
            >
              <img
                src="https://cdn.quentinrobert.fr/yowl/icons/Icon_parameters-rempli.png"
                class="h-7 w-7 content-end"
              />
              <ChevronDownIcon
                class="hidden w-5 h-5 ml-2 -mr-1"
                aria-hidden="true"
              />
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="
                absolute
                flex
                right-0
                w-48
                mt-2
                h-18
                origin-top-right
                bg-white
                divide-y divide-gray-100
                rounded-md
                shadow-lg
              "
            >
              <div
                class="flex flex-col items-center w-full px-2 py-2 space-y-2"
              >
                <MenuItem>
                  <div class="w-full">
                    <button
                      href=""
                      class="
                        bg-action-color
                        hover:bg-yellow-600
                        text-white
                        font-bold
                        py-2
                        px-4
                        rounded
                        w-full
                      "
                    >
                      Change Password
                    </button>
                  </div>
                </MenuItem>
                <MenuItem class="w-full">
                  <a
                    href="https://fr.gravatar.com/"
                    target="_blank"
                    class="
                      bg-action-color
                      hover:bg-yellow-600
                      text-white
                      font-bold
                      py-2
                      px-4
                      w-full
                      rounded
                    "
                  >
                    Change Icon Profil
                  </a>
                </MenuItem>
                <MenuItem>
                  <div class="w-full">
                    <button
                      href=""
                      class="
                        bg-red-500
                        hover:bg-red-700
                        text-white
                        font-bold
                        py-2
                        px-4
                        rounded
                        w-full
                      "
                      @click="logout"
                    >
                      Logout
                    </button>
                  </div>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
      <div class="flex flex-col items-center w-full">
        <img
          :src="him.avatar_url"
          class="h-28 w-28 rounded-full content-center"
        />
        <h1 class="font-bold text-2xl">
          {{ this.him.username }}
        </h1>
      </div>

      <div class="container pt-3 max-w-6xl px-5 mx-auto mb-3">
        <div class="flex gap-7 sm:grid-cols-2 lg:grid-cols-4">
          <div class="w-3/12 p-5 bg-white rounded-md shadow">
            <div class="text-base text-action-color font-semibold">Post</div>
            <div class="flex items-center pt-1">
              <div
                class="text-2xl font-bold text-gray-900"
                v-if="categories.Posted"
              >
                {{ categories.Posted.length }}
              </div>
            </div>
          </div>

          <div class="w-9/12 p-5 bg-white rounded-md shadow">
            <div class="text-base text-action-color font-semibold">
              Account Creation
            </div>
            <div class="flex items-center pt-1">
              <div class="text-2xl font-bold text-gray-900">
                {{ this.date }}
              </div>
            </div>
          </div>
        </div>

        <div class="pt-3">
          <div class="w-full p-5 bg-white rounded-md shadow">
            <div class="text-base text-action-color font-semibold">
              Category
            </div>
            <div class="w-full flex justify-between gap-9 pt-1">
              <div class="text-2xl font-bold text-gray-900">
                {{ upperCasify(him.category_1) }}
              </div>
              <div class="text-2xl font-bold text-gray-900">
                {{ upperCasify(him.category_1) }}
              </div>
              <div class="text-2xl font-bold text-gray-900">
                {{ upperCasify(him.category_1) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <TabGroup>
        <TabList
          class="flex py-2 px-2 space-x-1 bg-gris-mais-beaucoup overflow-x-auto"
        >
          <Tab
            v-for="category in Object.keys(categories)"
            as="template"
            :key="category"
            v-slot="{ selected }"
          >
            <button
              :class="[
                'w-full  py-4 px-3 leading-5 font-medium text-white rounded-lg ',

                selected
                  ? 'bg-action-color text-white shadow-lg'
                  : 'text-white hover:text-white  hover:bg-action-color ',
              ]"
            >
              {{ category }}
            </button>
          </Tab>
        </TabList>

        <TabPanels class="flex flex-col mt-2">
          <TabPanel
            v-for="(posts, idx) in Object.values(categories)"
            :key="idx"
            :class="['bg-white rounded-xl md:px-3']"
          >
            <div
              class="
                space-y-10
                py-10
                md:py-5 md:px-10
                flex flex-col
                items-center
              "
              v-if="categories.Posted"
            >
              <post
                :post="postItem"
                v-for="postItem in posts"
                v-bind:key="postItem.id"
              ></post>
            </div>
            <div
              v-else
              class="flex justify-center items-center h-screen -mt-top-nav"
            >
              <img
                src="https://cdn.quentinrobert.fr/yowl/loader-loop.gif"
                alt="logo Yowl"
                class="w-96"
              />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>

    <!-- Desk Part  -->
    <!-- BIg div -->
    <div
      class="hidden md:flex h-full px-10"
      style="padding-top: 90px"
      v-if="him"
    >
      <!-- left div -->
      <div class="flex-direction:column h-full w-3/12 px-5 bg-white">
        <div
          class="
            flex
            justify-center
            items-center
            space-x-3
            cursor-pointer
            pt-10
          "
        >
          <div
            class="
              w-28
              h-28
              rounded-full
              overflow-hidden
              border-2
              dark:border-white
              border-gray-900A
            "
          >
            <img
              :src="him.avatar_url"
              alt=""
              class="w-full h-full object-cover"
            />
          </div>
        </div>
        <div class="pt-6 font-bold text-center text-2xl">
          {{ him.username }}
        </div>

        <div class="flex justify-between items-center p-4 rounded-md mb-2">
          <div>
            <span class="text-md text-slate-400">Account Creation</span>
            <h1 class="text-2xl font-bold text-slate-100">
              {{ accountCreation }}
            </h1>
          </div>
        </div>

        <div class="flex justify-between items-center p-4 rounded-md mb-2">
          <div>
            <span class="text-md text-slate-400">POST</span>
            <h1
              class="text-2xl font-bold text-slate-100"
              v-if="categories.Posted"
            >
              {{ categories.Posted.length }}
            </h1>
          </div>
        </div>

        <div class="flex justify-between items-center p-4 rounded-md mb-2">
          <ul>
            <span class="text-md text-slate-400">Preferred Categories</span>
            <li class="text-2xl font-bold text-slate-100">
              {{ upperCasify(him.category_1) }}
            </li>
            <li class="text-2xl font-bold text-slate-100">
              {{ upperCasify(him.category_2) }}
            </li>
            <li class="text-2xl font-bold text-slate-100">
              {{ upperCasify(him.category_3) }}
            </li>
          </ul>
          <div>
            <img class="h-14" :src="bestCategoryImage" />
          </div>
        </div>

        <hr />
      </div>

      <!-- right div -->
      <div class="h-full w-9/12 px-5">
        <div class="flex flex-col align-center w-full px-2 py-6 l:px-0">
          <TabGroup>
            <TabList
              class="flex py-2 px-2 space-x-1 rounded-lg bg-gris-mais-beaucoup"
            >
              <Tab
                v-for="category in Object.keys(categories)"
                as="template"
                :key="category"
                v-slot="{ selected }"
              >
                <button
                  :class="[
                    'w-full  py-4 px-3 leading-5 font-medium text-white rounded-lg ',

                    selected
                      ? 'bg-action-color text-white shadow-lg'
                      : 'text-white hover:text-white  hover:bg-action-color ',
                  ]"
                >
                  {{ category }}
                </button>
              </Tab>
            </TabList>

            <TabPanels class="flex flex-col mt-2">
              <TabPanel
                v-for="(posts, idx) in Object.values(categories)"
                :key="idx"
                :class="['bg-white rounded-xl p-3']"
              >
                <div
                  class="
                    space-y-10
                    py-10
                    md:py-5 md:px-10
                    flex flex-col
                    items-center
                  "
                  v-if="categories.Posted"
                >
                  <post
                    :post="postItem"
                    v-for="postItem in posts"
                    v-bind:key="postItem.id"
                  ></post>
                </div>
                <div
                  v-else
                  class="flex justify-center items-center h-screen -mt-top-nav"
                >
                  <img
                    src="https://cdn.quentinrobert.fr/yowl/loader-loop.gif"
                    alt="logo Yowl"
                    class="w-96"
                  />
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import dayjs from "dayjs";
import navBar from "../components/Nav-bar.vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/solid";

import { api_url } from "../../config.json";
import axios from "axios";
import Post from "../components/Post.vue";

export default {
  name: "Account-page",
  components: {
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    navBar,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    ChevronDownIcon,
    Post,
  },
  data() {
    return {
      me: JSON.parse(sessionStorage.getItem("user")),
      date: "",
      that: this,
      bestCategoryImage: "",
      accountCreation: "",
      him: "",
    };
  },
  async mounted() {
    let response = await axios.get(`${api_url}/users/${this.$route.params.id}`);
    this.him = response.data;

    let date = dayjs(`${this.him.accountCreation}`);
    this.date = date.format("MM/DD/YYYY");
    let posted = await axios.get(
      `${api_url}/posts/p/posted/${this.$route.params.id}`
    );
    !this.categories.Posted ? (this.categories.Posted = []) : "";
    posted.data.map(async (post) => {
      let rep = await axios.get(`${api_url}/posts/${post.id}`);
      this.categories.Posted.push(rep.data);
    });
    let upvoted = await axios.get(
      `${api_url}/posts/p/upvoted/${this.$route.params.id}`
    );
    console.log(upvoted.data);
    upvoted.data.map(async (post) => {
      let rep = await axios.get(`${api_url}/posts/${post.id}`);
      this.categories.Upvoted.push(rep.data);
    });
    let downvoted = await axios.get(
      `${api_url}/posts/p/downvoted/${this.$route.params.id}`
    );
    downvoted.data.map(async (post) => {
      let rep = await axios.get(`${api_url}/posts/${post.id}`);
      this.categories.Downvoted.push(rep.data);
    });
    let commented = await axios.get(
      `${api_url}/posts/p/commented/${this.$route.params.id}`
    );
    commented.data.map(async (post) => {
      let rep = await axios.get(`${api_url}/posts/${post.id}`);
      this.categories.Commented.push(rep.data);
    });
    let bestCatImg = await axios.get(
      `${api_url}/categories/c/${this.him.category_1}`
    );
    this.bestCategoryImage = bestCatImg.data.img;
    // this.categories.Posted = posted.data;
    // this.categories.Upvoted = upvoted.data;
    // this.categories.Downvoted = downvoted.data;
    this.accountCreation = dayjs(this.him.accountCreation).format(
      "MMMM, DD YYYY"
    );
  },
  methods: {
    logout() {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      this.that.$router.push("/");
      return;
    },
    upperCasify(word) {
      return word[0].toUpperCase() + word.slice(1);
    },
  },
  setup() {
    let categories = ref({
      Posted: null,
      Commented: [],
      Upvoted: [],
      Downvoted: [],
    });

    return { categories };
  },
};
</script>