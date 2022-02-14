<template>
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
    <form action="#" method="POST" @submit.prevent="login">
      <div
        class="
          bg-white
          px-10
          py-8
          rounded-xl
          md:w-screen
          shadow-2xl
          md:max-w-md
          m-5
        "
      >
        <div class="space-y-4">
          <div class="flex justify-center items-center pb-3 space-x-2">
            <router-link
              class="flex items-center space-x-1"
              :to="{ name: 'Home' }"
            >
              <img
                class="h-10"
                src="https://cdn.quentinrobert.fr/yowl/Logo_Yowl.png"
                alt="logo-Yowl"
              />
              <p class="text-center text-3xl font-semibold text-gray-600">
                Yowl
              </p>
            </router-link>

            <h1 class="text-center text-3xl font-semibold text-gray-600">
              - Login
            </h1>
          </div>

          <div class="relative py-3">
            <input
              id="login1"
              v-model="identifier"
              name="email"
              type="text"
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
              "
              placeholder="mail@mail.com"
              required
            />
            <label
              for="login"
              class="
                absolute
                left-3
                -top-3.5
                text-gray-600 text-sm
                transition-all
                peer-placeholder-shown:text-base
                peer-placeholder-shown:text-gray-400
                peer-placeholder-shown:top-5
                peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm
              "
            >
              Username or Email
            </label>
          </div>

          <div class="relative py-3">
            <input
              id="login2"
              v-model="password"
              name="Password"
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
              "
              placeholder="mail@mail.com"
              required
            />
            <label
              for="login2"
              class="
                absolute
                left-3
                -top-3.5
                text-gray-600 text-sm
                transition-all
                peer-placeholder-shown:text-base
                peer-placeholder-shown:text-gray-400
                peer-placeholder-shown:top-5
                peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm
              "
            >
              Confirmed Password
            </label>
          </div>
          <p class="text-red-500">{{ this.errorMessage }}</p>
        </div>
        <button
          type="submit"
          class="
            mt-4
            w-full
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
          Login
        </button>
        <div class="flex justify-between pt-4">
          <router-link :to="{ name: 'Register' }">
            <p
              class="text-base text-action-color hover:text-action-color-hover"
            >
              Dont't have an account ?
            </p>
          </router-link>
          <router-link :to="{ name: 'Reset-password' }">
            <p
              class="text-base text-action-color hover:text-action-color-hover"
            >
              Forgot password
            </p>
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<style>
@keyframes animatedBackground {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 0 100%;
  }
}
#body {
  background-image: url(https://cdn.quentinrobert.fr/yowl/wave.png);
  background-position: 0px 0px;
  background-repeat: repeat-y;
  animation: animatedBackground 60s linear infinite;
  background-size: cover;
}
</style>

<script>
import axios from "axios";
import { api_url } from "../../config.json";

export default {
  name: "Login",
  data() {
    return {
      identifier: "",
      password: "",
      token: "",
      errorMessage: "",
    };
  },
  methods: {
    login() {
      const credentials = {
        identifier: this.identifier,
        password: this.password,
      };

      axios
        .post(api_url + "/login", credentials)
        .then((result) => {
          sessionStorage.setItem("token", result.data.jwt);
          sessionStorage.setItem("user", JSON.stringify(result.data));

          this.$router.push("/");
        })
        .catch((error) => {
          let code = error.response.status;
          code == 403
            ? (this.errorMessage = "Wrong credentials")
            : (this.errorMessage = "There was an error");
          console.log(error.response.status);
          console.log("There was an error!", error);
        });
    },
  },
};
</script>