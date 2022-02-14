<template>
  <div>
    <div
      id="body"
      class="
        h-screen
        bg-gradient-to-br
        from-red-500
        to-red-600
        flex
        justify-center
        items-center
        w-full
      "
    >
      <form action="#" method="POST" @submit.prevent="changePassword">
        <div
          class="bg-white px-10 py-8 rounded-xl md:w-screen shadow-2xl md:max-w-md m-5"
        >
          <div class="space-y-4">
            <h1 class="text-center text-3xl font-semibold text-gray-600 pb-4">
              Change your password
            </h1>
            
            <div class="relative py-3">
              <input id="changepassword1" 
                  v-model="password" 
                  name="password" 
                  type="password" 
                  class="
                    peer 
                    bg-indigo-50 
                    px-4 
                    py-2 
                    outline-none 
                    rounded-md 
                    w-full
                    h-10 
                    border-gray-300 
                    text-gray-900 
                    placeholder-transparent 
                    focus:outline-none 
                    focus:border-rose-600" 
                    placeholder="mail@mail.com" 
                    required
                    />
              <label 
                  for="changepassword1" 
                  class="
                  absolute 
                  left-3 
                  -top-3.5 
                  text-gray-600 
                  text-sm 
                  transition-all 
                  peer-placeholder-shown:text-base 
                  peer-placeholder-shown:text-gray-400 
                  peer-placeholder-shown:top-5 
                  peer-focus:-top-3.5
                  peer-focus:text-gray-600 
                  peer-focus:text-sm
                  ">
                  Password
                  </label>
                   
            </div>

            <div class="relative py-3">
            <input id="changepassword2" 
                  v-model="passwordConfirmed" 
                  name="Confirm Password" 
                  type="password" 
                  class="
                    peer 
                    bg-indigo-50 
                    px-4 
                    py-2 
                    outline-none 
                    rounded-md 
                    w-full
                    h-10 
                    border-gray-300 
                    text-gray-900 
                    placeholder-transparent 
                    focus:outline-none" 
                    placeholder="mail@mail.com" 
                    required
                    />
                    
              <label 
                  for="changepassword2" 
                  class="
                  absolute 
                  left-3 
                  -top-3.5 
                  text-gray-600 
                  text-sm 
                  transition-all 
                  peer-placeholder-shown:text-base 
                  peer-placeholder-shown:text-gray-400 
                  peer-placeholder-shown:top-5 
                  peer-focus:-top-3.5
                  peer-focus:text-gray-600 
                  peer-focus:text-sm
                  ">
                  Confirmed Password
                  </label>
          </div>

            <p class="text-red-500">{{error}}</p>
          </div>
          <div class="flex justify-between space-x-7">
            <router-link
              :to="{ name: 'Login' }"
              class="
                mt-4
                w-2/5
                bg-gray-200
                hover:bg-gray-300
                ease-in-out
                duration-300
                text-gray-500
                py-2
                rounded-md
                text-lg
                tracking-wide
                flex
                justify-center
              "
            >
              Cancel
            </router-link>

            <button
              type="submit"
              class="
                mt-4
                md:w-4/6
                bg-action-color
                hover:bg-action-color-hover
                ease-in-out
                duration-300
                text-white
                py-2
                rounded-md
                text-lg
                tracking-wide
                w-5/6
              "
            >
              Change password
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { api_url } from "../../config.json";

export default {
  name: "Change-password",
  data() {
    return {
      email:'',
      password: this.password,
      passwordConfirmed: this.passwordConfirmed,
      error: ""
    };
  },
  methods: {
    changePassword() {
      if (this.password == this.passwordConfirmed) {
        const config = {
          headers: { Authorization: `Bearer ${this.$route.query.user}` },
        };
        const credentials = { password: this.password };
        axios
          .post(api_url + "/change-password", credentials, config)
          .then(() => {
            this.$router.push({ name: "Login" });
          });
      } else {
        this.error = "Passwords don't match"
      }
    },
  },
};
</script>