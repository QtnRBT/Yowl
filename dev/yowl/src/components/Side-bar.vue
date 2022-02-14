<template>
  <div>
    <div id="sideBar" class="hidden md:block">
      <div
        class="
          bg-black
          right-0
          bottom-0
          fixed
          top-0
          left-0
          z-50
          opacity-60
          md:hidden
          cursor-pointer
        "
        @click="hide"
      ></div>
      <div
        class="
          flex flex-col
          left-0
          w-64
          bg-gris-mais-beaucoup
          h-screen
          md:relative
          fixed
          z-50
          top-0
          md:top-4
          lg:top-0
        "
      >
        <div
          class="
            overflow-y-scroll
            h-screen
            overflow-x-hidden
            z-40
            absolute
            top-5
            md:top-0
            w-full
            px-1
          "
        >
          <div
            @click="hide"
            class="
              left-0
              pl-6
              md:hidden md:z-0
              fixed
              top-0
              pt-6
              bg-gris-mais-beaucoup
              w-64
              z-50
              pb-2
              flex flex-row
              justify-between
              items-center
              cursor-pointer
            "
          >
            <i class="fas fa-bars text-white text-xl"></i>
            <div class="flex flex-row pr-24 items-center space-x-2">
              <img
                src="https://cdn.quentinrobert.fr/yowl/Logo_Yowl.png"
                alt="logo-Yowl"
                class="w-6 h-6"
              />
              <p class="text-white text-xl">Yowl</p>
            </div>
          </div>
          <ul class="pb-28 flex flex-col py-4 space-y-1 mt-6 md:mt-0 pt-6">
            <li class="px-5">
              <div class="flex flex-row items-center h-8">
                <div class="text-lg font-bold tracking-wide text-action-color">
                  Popular
                </div>
              </div>
            </li>
            <li class="text-white">
              <router-link
                :to="{ name: 'Home'}"
                class="
                  relative
                  flex flex-row
                  items-center
                  h-11
                  focus:outline-none
                  hover:bg-action-color
                  text-white
                  border-l-4 border-transparent
                  hover:border-gray-50
                  pr-6
                "
                ><span class="inline-flex justify-center items-center ml-4">
                  <img
                    src="https://cdn.quentinrobert.fr/yowl/icons/home-white.svg"
                    class="w-5 h-5"
                  />
                </span>
                <span class="ml-4 text-sm tracking-wide truncate">Home</span></router-link
              >
            </li>
            <li class="text-white">
              <router-link
                :to="{ name: 'Hot'}"
                class="
                  relative
                  flex flex-row
                  items-center
                  h-11
                  focus:outline-none
                  hover:bg-action-color
                  text-white
                  border-l-4 border-transparent
                  hover:border-gray-50
                  pr-6
                "
                ><span class="inline-flex justify-center items-center ml-4">
                  <img
                    src="https://cdn.quentinrobert.fr/yowl/icons/hot-white.svg"
                    class="w-5 h-5"
                  />
                </span>
                <span class="ml-4 text-sm tracking-wide truncate">Hot</span></router-link
              >
            </li>
            <li class="text-white">
              <router-link
                :to="{name: 'MostRecent'}"
                class="
                  relative
                  flex flex-row
                  items-center
                  h-11
                  focus:outline-none
                  hover:bg-action-color
                  text-white
                  border-l-4 border-transparent
                  hover:border-gray-50
                  pr-6
                "
                ><span class="inline-flex justify-center items-center ml-4">
                  <img
                    src="https://cdn.quentinrobert.fr/yowl/icons/most-recent-white.svg"
                    class="w-5 h-5"
                  />
                </span>
                <span class="ml-4 text-sm tracking-wide truncate"
                  >Most recent</span
                ></router-link
              >
            </li>
            <li class="px-5">
              <div class="flex flex-row items-center h-8">
                <div class="text-lg font-bold tracking-wide text-action-color">
                  Categories
                </div>
              </div>
            </li>
            <li v-for="category in categories" v-bind:key="category.id">
              <router-link
                :to="'/' + category.name"
                class="
                  relative
                  flex flex-row
                  items-center
                  h-11
                  focus:outline-none
                  hover:bg-action-color
                  text-white
                  border-l-4 border-transparent
                  hover:border-gray-50
                  pr-6
                "
              >
                <span class="inline-flex justify-center items-center ml-4">
                  <img :src="category.icon" class="w-5 h-5" />
                </span>
                <span class="ml-4 text-sm tracking-wide truncate">{{
                  category.name[0].toUpperCase() +
                  category.name.slice(1, category.name.length)
                }}</span>
              </router-link>
            </li>
            <!-- <li>
              <a
                href="#"
                class="
                  relative
                  flex flex-row
                  items-center
                  h-11
                  focus:outline-none
                  hover:bg-gray-50
                  text-white
                  hover:text-gray-800
                  border-l-4 border-transparent
                  hover:border-action-color
                  pr-6
                "
              >
                <span class="inline-flex justify-center items-center ml-4">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                </span>
                <span class="ml-2 text-sm tracking-wide truncate">Clients</span>
                <span
                  class="
                    px-2
                    py-0.5
                    ml-auto
                    text-xs
                    font-medium
                    tracking-wide
                    text-green-500
                    bg-green-50
                    rounded-full
                  "
                  >15</span
                >
              </a>
            </li> -->
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-link-active {
  background-color: #e59a32;
  border-color: rgba(249, 250, 251)
}
</style>

<script>
export default {
  name: "Side-bar",
  props: ["categories"],
  methods: {
    hide() {
      document.getElementById("sideBar").classList.toggle("hidden");
      document.getElementById("sideBar").classList.toggle("active");
      // Close même sur desktop
      document.getElementById("sideBar").classList.toggle("md:hidden");
      document.getElementById("posts").classList.toggle("md:pl-side-bar");
    },
  },
};
</script>