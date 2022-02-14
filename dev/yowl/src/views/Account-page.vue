<template>
  <div class="home h-screen">
    <navBar class="md:fixed md:block hidden z-50" :user="me"></navBar>

    <!-- mobile part  -->
    <div class="md:hidden">
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
                      Change password
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
                    Change profile picture
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
          :src="me.avatar_url"
          class="h-28 w-28 rounded-full content-center"
        />
        <h1 class="font-bold text-2xl">
          {{ this.me.username }}
        </h1>
      </div>

      <div class="container pt-3 max-w-6xl px-5 mx-auto mb-3">
        <div class="flex gap-7 sm:grid-cols-2 lg:grid-cols-4">
          <div class="w-3/12 p-5 bg-white rounded-md shadow">
            <div class="text-base text-action-color font-semibold">Post</div>
            <div class="flex items-center pt-1">
              <div class="text-2xl font-bold text-gray-900" v-if="categories.Posted">
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
              Preferred categories
            </div>
            <div class="w-full flex justify-between gap-9 pt-1">
              <div class="text-2xl font-bold text-gray-900">
                {{
                  this.me.category_1.charAt(0).toUpperCase() +
                  this.me.category_1.slice(1)
                }}
              </div>
              <div class="text-2xl font-bold text-gray-900">
                {{
                  this.me.category_2.charAt(0).toUpperCase() +
                  this.me.category_2.slice(1)
                }}
              </div>
              <div class="text-2xl font-bold text-gray-900">
                {{
                  this.me.category_3.charAt(0).toUpperCase() +
                  this.me.category_3.slice(1)
                }}
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
            >
              <post
                :post="postItem"
                v-for="postItem in posts"
                v-bind:key="postItem.id"
              ></post>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>

    <!-- Desk Part  -->
    <!-- BIg div -->
    <div class="hidden md:flex h-full px-10" style="padding-top: 90px">
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
              :src="me.avatar_url"
              alt=""
              class="w-full h-full object-cover"
            />
          </div>
        </div>
        <div class="pt-6 font-bold text-center text-2xl">{{ me.username }}</div>

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
            <span class="text-md text-slate-400">Amount of posts</span>
            <h1 class="text-2xl font-bold text-slate-100" v-if="categories.Posted">
              {{ categories.Posted.length }}
            </h1>
          </div>
        </div>

        <div class="flex justify-between items-center p-4 rounded-md mb-2">
          <ul>
            <span class="text-md text-slate-400">Preferred Categories</span>
            <li class="text-2xl font-bold text-slate-100">
              {{ upperCasify(me.category_1) }}
            </li>
            <li class="text-2xl font-bold text-slate-100">
              {{ upperCasify(me.category_2) }}
            </li>
            <li class="text-2xl font-bold text-slate-100">
              {{ upperCasify(me.category_3) }}
            </li>
          </ul>
          <div>
            <img class="h-14" :src="bestCategoryImage" />
          </div>
        </div>

        <hr />

        <div class="flex flex-col pt-4 px-3 py-3 font-bold text-l space-y-3">
          <button
            class="
              bg-action-color
              hover:bg-yellow-600
              text-white
              font-bold
              py-2
              px-4
              rounded
            "
          >
            Change password
          </button>

          <a
            href="https://fr.gravatar.com/"
            target="blank"
            class="
              flex
              justify-center
              bg-action-color
              hover:bg-yellow-600
              text-white
              font-bold
              py-2
              px-4
              rounded
            "
          >
            Change profile picture
          </a>

          <button
            class="
              bg-red-500
              hover:bg-red-700
              text-white
              font-bold
              py-2
              px-4
              mb-4
              rounded
            "
            @click="logout"
          >
            Logout
          </button>
        </div>
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
                  v-if="posts"
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
      commentedPosts: [],
    };
  },
  async mounted() {
    let date = dayjs(`${this.me.accountCreation}`);
    this.date = date.format("MM/DD/YYYY");
    let posted = await axios.get(`${api_url}/posts/p/posted/${this.me.id}`);
    !this.categories.Posted ? this.categories.Posted = [] : '';
    posted.data.map(async (post) => {
      let rep = await axios.get(`${api_url}/posts/${post.id}`);
      this.categories.Posted.push(rep.data);
    });
    let saved = await axios.get(`${api_url}/posts/p/saved`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    });
    saved.data.map(async (post) => {
      let rep = await axios.get(`${api_url}/posts/${post.id}`);
      this.categories.Saved.push(rep.data);
    });
    let upvoted = await axios.get(`${api_url}/posts/p/upvoted/${this.me.id}`);
    upvoted.data.map(async (post) => {
      let rep = await axios.get(`${api_url}/posts/${post.id}`);
      this.categories.Upvoted.push(rep.data);
    });
    let commented = await axios.get(
      `${api_url}/posts/p/commented/${this.me.id}`
    );
    await commented.data.map(async (post) => {
      console.log("oui");
      let rep = await axios.get(`${api_url}/posts/${post.id}`);
      this.categories.Commented.includes(JSON.stringify(rep.data))
        ? ""
        : this.categories.Commented.push(rep.data);
    });
    let bestCatImg = await axios.get(
      `${api_url}/categories/c/${this.me.category_1}`
    );
    this.bestCategoryImage = bestCatImg.data.img;
    // this.categories.Posted = posted.data;
    // this.categories.Saved = saved.data;
    // this.categories.Upvoted = upvoted.data;
    this.accountCreation = dayjs(this.me.accountCreation).format(
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
      Saved: [],
      Commented: [],
      Upvoted: [],
    });

    return { categories };
  },
};
</script>