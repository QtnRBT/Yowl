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
      <form action="#" method="POST" @submit.prevent="resetEmail">
        <div
          class="bg-white px-10 py-8 rounded-xl md:w-screen shadow-2xl md:max-w-md m-5"
        >
          <div class="space-y-4">
            <h1 class="text-center text-3xl font-semibold text-gray-600 pb-3">
              Reset your password
            </h1>
            <div class="relative py-3">
              <input id="resetpassword" 
                  v-model="email" 
                  name="email" 
                  type="email" 
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
                  for="resetpassword" 
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
                  Email
                  </label>
                   
            </div>
          </div>
          <p class="text-green-600">{{message}}</p>
          <p class="text-red-600">{{error}}</p>
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
                w-4/6
                bg-action-color
                hover:bg-action-color-hover
                ease-in-out
                duration-300
                text-white
                py-2
                rounded-md
                text-lg
                tracking-wide
              "
            >
              Send mail
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
  name: "Reset-password",
  data() {
    return {
      email: "",
      message: "",
      error: ""
    };
  },
  methods: {
    resetEmail() {
      const credential = { email: this.email };

      axios
        .post(api_url + "/reset-password", credential)
        .then((response) => {
          this.message = "";
          this.message = response.data.msg;
          this.error = "";
        })
        .catch((error) => {
          this.message = "";
          this.error = "";
          if(error.response && error.response.status == 404) return this.error = "This email is not in our database."
          this.error = "There was an error, please check the console.";
          console.log(error);
          return;
        });
    },
  },
};
</script>