<template>
  <div>
    <!-- This is an example component -->
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"
      rel="stylesheet"
    />
    <div
      class="
        w-screen
        flex flex-row
        items-center
        justify-between
        bg-gris-mais-beaucoup
        shadow-x
        py-2
        md:space-x-0
        space-x-6
        pr-6
      "
    >
      <div @click="hide()" class="flex flex-row-reverse ml-6 md:hidden">
        <i class="fas fa-bars text-white"></i>
      </div>
      <div
        class="
          ml-8
          text-lg text-gray-700
          hidden
          md:flex md:items-center md:space-x-2
        "
      >
        <div @click="hide" class="flex flex-row-reverse ml-6 cursor-pointer">
          <i class="fas fa-bars text-white" id="close"></i>
        </div>
        <router-link
          class="
            ml-8
            text-lg text-gray-700
            hidden
            md:flex md:items-center md:space-x-2
          "
          :to="{ name: 'Home' }"
        >
          <img
            src="https://cdn.quentinrobert.fr/yowl/Logo_Yowl.png"
            alt="logo-Yowl"
            class="w-10"
          />
          <p class="text-white text-2xl">Yowl</p>
        </router-link>
      </div>
      <!-- Big seachbar if user -->
      <span
        class="
          w-screen
          md:w-3/5
          lg:w-1/2
          h-10
          flex
          bg-action-color
          cursor-pointer
          border border-action-color
          text-sm
          rounded-full
          md:flex
        "
        v-if="user"
      >
        <input
          type="search"
          name="serch"
          placeholder="Search"
          class="
            flex-grow
            px-4
            rounded-l-full rounded-r-full
            text-sm
            focus:outline-none
          "
        />
        <i class="fas fa-search m-3 mr-5 text-lg text-white w-4 h-4"> </i>
      </span>
      <!-- Else, small searchbar -->
      <span
        class="
          w-1/2
          md:w-2/5
          lg:w-1/2
          h-10
          bg-action-color
          flex
          cursor-pointer
          border border-action-color
          text-sm
          rounded-full
          md:flex
        "
        v-else
      >
        <input
          type="search"
          name="serch"
          placeholder="Search"
          class="
            pl-4
            rounded-l-full rounded-r-full
            w-3/4
            md:w-full
            text-sm
            focus:outline-none
          "
        />
        <i class="fas fa-search m-3 mr-5 text-lg text-white w-4 h-4"> </i>
      </span>
      <div class="flex-row-reverse mr-8 md:flex hidden" v-if="user == null">
        <router-link :to="{ name: 'Login' }">
          <button
            class="
              text-white text-center
              bg-action-color
              px-4
              py-2
              m-2
              rounded-md
            "
          >
            Login
          </button>
        </router-link>
        <router-link :to="{ name: 'Register' }">
          <button
            class="
              text-gris-mais-beaucoup text-center
              bg-white
              px-4
              py-2
              m-2
              rounded-md
            "
          >
            Register
          </button>
        </router-link>
      </div>
      <router-link
        :to="{ name: 'Login' }"
        class="
          block
          md:hidden
          text-white text-center
          bg-action-color
          px-4
          py-2
          m-2
          rounded-md
        "
        v-if="user == null"
      >
        Sign in</router-link
      >
      <div v-else>
        <router-link to="/account-page">
          <img
            :src="user.avatar_url"
            alt="My profile picture"
            class="md:max-h-14 max-h-20 mr-8 rounded-full"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav-bar2",
  props: ["user"],
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