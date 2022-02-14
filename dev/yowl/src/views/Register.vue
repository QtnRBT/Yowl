<template>
  <div
    id="body"
    class="
      h-screen
      bg-gradient-to-br
      from-blue-600
      to-indigo-600
      flex
      justify-center
      items-center
      w-full
    "
  >
    <!-- Form -->
    <form class="md:w-1/2 md:max-w-xl w-full py-12 px-5" @submit.prevent="">
      <div class="bg-white px-8 py-5 rounded-xl w-12/12 shadow-2xl">
        <div class="justify-center max-w-3xl mx-auto px-4 pt-5 space-y-4">
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
            <p class="text-center text-3xl font-semibold text-gray-600">Yowl</p>
          </router-link>
          <h1 class="text-3xl text-center font-semibold text-gray-600">
            - Register
          </h1>
          </div>
          
          <div class="flex justify-center space-x-5">
            <span
              class="stepi"
              :class="step >= 1 ? 'bg-action-color' : 'bg-gray-300'"
            ></span>
            <span
              class="stepi"
              :class="step >= 2 ? 'bg-action-color' : 'bg-gray-300'"
            ></span>
            <span
              class="stepi"
              :class="step >= 3 ? 'bg-action-color' : 'bg-gray-300'"
            ></span>
            <span
              class="stepi"
              :class="step >= 4 ? 'bg-action-color' : 'bg-gray-300'"
            ></span>
          </div>
          <div :class="step === 'complete' ? '' : 'hidden'">
            <div
              class="
                bg-white
                rounded-lg
                p-10
                flex
                items-center
                shadow
                justify-between
              "
            ></div>
          </div>

          <div :class="step != 'complete' ? '' : 'hidden'">
            <!-- Top Navigation -->
            <div class="border-b-2 py-4">
              <div
                class="
                  uppercase
                  tracking-wide
                  text-xs
                  font-bold
                  text-gray-500
                  mb-1
                  leading-tight
                "
                x-text="`Step: ${step} of 4`"
              ></div>
              <div
                class="
                  flex flex-col
                  md:flex-row md:items-center md:justify-between
                "
              >
                <!-- Title -->
                <div class="flex-1">
                  <div :class="step === 1 ? '' : 'hidden'">
                    <div
                      class="
                        md:text-2xl
                        text-xl
                        font-semibold
                        text-gray-600
                        leading-tight
                      "
                    >
                      Username & Birthdate
                    </div>
                  </div>

                  <div :class="step === 2 ? '' : 'hidden'">
                    <div
                      class="
                        md:text-2xl
                        text-xl
                        font-semibold
                        text-gray-600
                        leading-tight
                      "
                    >
                      Password & Email
                    </div>
                  </div>

                  <div :class="step === 3 ? '' : 'hidden'">
                    <div class="font-semibold text-gray-600 leading-tight">
                      <p class="md:text-2xl text-xl">
                        Customize your experience
                      </p>
                      <p class="md:text-xl text-lg">Choose 3 categories :</p>
                    </div>
                  </div>

                  <div :class="step === 4 ? '' : 'hidden'">
                    <div class="font-semibold text-gray-600 leading-tight">
                      <p class="md:text-2xl text-xl">
                        You have registered successfully !
                      </p>
                      <p class="md:text-xl text-lg">
                        Redirecting you to the homepage...
                      </p>
                    </div>
                  </div>
                  <!-- Step - Failed to register -->
                  <div :class="step === 10 ? '' : 'hidden'">
                    <div class="font-semibold text-gray-600 leading-tight">
                      <p class="md:text-2xl text-xl">There was an errrrror !</p>
                      <p class="md:text-xl text-lg">Try registering again</p>
                    </div>
                  </div>
                  <!-- Step - Failed to register dans le futur -->
                  <div :class="step === 20 ? '' : 'hidden'">
                    <div class="font-semibold text-gray-600 leading-tight">
                      <p class="md:text-2xl text-xl">Marty is that you ?!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- /Top Navigation -->

            <!-- Step Content -->

            <div class="pt-6">
              <!-- Step 1 - User informations -->
              <div :class="step === 1 ? '' : 'hidden'">
                <div class="relative py-2">
                  <input
                    id="username"
                    v-model="username"
                    name="username"
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
                    for="username"
                    class="
                      absolute
                      left-3
                      -top-3.5
                      text-gray-600 text-sm
                      transition-all
                      peer-placeholder-shown:text-base
                      peer-placeholder-shown:text-gray-400
                      peer-placeholder-shown:top-4
                      peer-focus:-top-3.5
                      peer-focus:text-gray-600
                      peer-focus:text-sm
                    "
                  >
                    Enter your Username
                  </label>
                </div>

                <div
                  class="relative py-3 flex flex-wrap justify-center mb-5 pt-6"
                >
                  <div class="justify-between flex w-full gap-x-5">
                    <div class="relative py-2 w-1/2">
                      <input
                        id="month"
                        v-model="month"
                        name="month"
                        type="number"
                        min="1"
                        max="12"
                        class="
                          peer
                          bg-indigo-50
                          px-4
                          py-2
                          outline-none
                          rounded-md
                          w-full
                          border-gray-300
                          text-gray-900
                          placeholder-transparent
                          focus:outline-none
                        "
                        placeholder="month"
                        required
                      />
                      <label
                        for="month"
                        class="
                          absolute
                          left-3
                          -top-3.5
                          text-gray-600 text-sm
                          transition-all
                          peer-placeholder-shown:text-base
                          peer-placeholder-shown:text-gray-400
                          peer-placeholder-shown:top-4
                          peer-focus:-top-3.5
                          peer-focus:text-gray-600
                          peer-focus:text-sm
                        "
                      >
                        Month
                      </label>
                    </div>

                    <div class="relative py-2 w-1/2">
                      <input
                        id="day"
                        v-model="day"
                        name="day"
                        type="number"
                        min="1"
                        max="31"
                        class="
                          peer
                          bg-indigo-50
                          px-4
                          py-2
                          outline-none
                          rounded-md
                          w-full
                          border-gray-300
                          text-gray-900
                          placeholder-transparent
                          focus:outline-none
                        "
                        placeholder="month"
                        required
                      />
                      <label
                        for="day"
                        class="
                          absolute
                          left-3
                          -top-3.5
                          text-gray-600 text-sm
                          transition-all
                          peer-placeholder-shown:text-base
                          peer-placeholder-shown:text-gray-400
                          peer-placeholder-shown:top-4
                          peer-focus:-top-3.5
                          peer-focus:text-gray-600
                          peer-focus:text-sm
                        "
                      >
                        Day
                      </label>
                    </div>
                  </div>

                  <div class="relative py-2 w-full pt-5">
                    <input
                      id="year"
                      v-model="year"
                      name="day"
                      type="number"
                      min="1900"
                      class="
                        peer
                        bg-indigo-50
                        px-4
                        py-2
                        outline-none
                        rounded-md
                        w-full
                        border-gray-300
                        text-gray-900
                        placeholder-transparent
                        focus:outline-none
                      "
                      placeholder="year"
                      required
                    />
                    <label
                      for="year"
                      class="
                        absolute
                        left-3
                        -top-3.5
                        pt-3
                        text-gray-600 text-sm
                        transition-all
                        peer-placeholder-shown:text-base
                        peer-placeholder-shown:text-gray-400
                        peer-placeholder-shown:top-4
                        peer-focus:-top-3.5
                        peer-focus:text-gray-600
                        peer-focus:text-sm
                      "
                    >
                      Birth year
                    </label>
                  </div>
                </div>

                <p class="text-red-500">
                  {{ this.errorMessage }}
                </p>
              </div>

              <!-- Step 2 - Email & Password -->
              <div :class="step === 2 ? '' : 'hidden'">
                <div class="mb-2 py-3">
                  <div class="relative py-5">
                    <input
                      id="email"
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
                        focus:outline-none
                      "
                      placeholder="mail@mail.com"
                      required
                    />
                    <label
                      for="email"
                      class="
                        absolute
                        left-3
                        -top-2
                        text-gray-600 text-sm
                        transition-all
                        peer-placeholder-shown:text-base
                        peer-placeholder-shown:text-gray-400
                        peer-placeholder-shown:top-7
                        peer-focus:-top-2
                        peer-focus:text-gray-600
                        peer-focus:text-sm
                      "
                    >
                      Your Email
                    </label>
                  </div>

                  <div class="relative py-5">
                    <input
                      id="password"
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
                      "
                      placeholder="mail@mail.com"
                      required
                    />
                    <label
                      for="password"
                      class="
                        absolute
                        left-3
                        -top-2
                        text-gray-600 text-sm
                        transition-all
                        peer-placeholder-shown:text-base
                        peer-placeholder-shown:text-gray-400
                        peer-placeholder-shown:top-7
                        peer-focus:-top-2
                        peer-focus:text-gray-600
                        peer-focus:text-sm
                      "
                    >
                      Your Password
                    </label>
                  </div>

                  <div class="relative py-5">
                    <input
                      id="password2"
                      v-model="passwordConfirmed"
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
                      "
                      placeholder="mail@mail.com"
                      required
                    />
                    <label
                      for="password2"
                      class="
                        absolute
                        left-3
                        -top-2
                        text-gray-600 text-sm
                        transition-all
                        peer-placeholder-shown:text-base
                        peer-placeholder-shown:text-gray-400
                        peer-placeholder-shown:top-7
                        peer-focus:-top-2
                        peer-focus:text-gray-600
                        peer-focus:text-sm
                      "
                    >
                      Confirm your Password
                    </label>
                  </div>
                </div>

                <p class="text-red-500">
                  {{ this.errorMessage }}
                </p>
              </div>
              <!-- Step 3 - Categories -->
              <div :class="step === 3 ? '' : 'hidden'">
                <div class="flex flex-wrap gap-x-4 gap-y-4">
                  <input
                    type="checkbox"
                    class="absolute opacity-0 invisible"
                    v-for="category in categories"
                    v-bind:key="category.id"
                    :value="category.name"
                    :id="category.name"
                    :disabled="
                      inputs.length > 2 &&
                      inputs.indexOf(n) === -1 &&
                      !inputs.includes(category.name)
                    "
                    v-model="inputs"
                  />
                  <label
                    v-for="category in categories"
                    v-bind:key="category.id"
                    :for="category.name"
                    :style="
                      inputs.includes(category.name) ? checked : unchecked
                    "
                    class="transition duration-300 ease-in-out"
                    >{{ category.name }}</label
                  >
                </div>
                <p class="text-red-500 pt-2">
                  {{ this.errorMessage }}
                </p>
              </div>
              <!-- Step 4 - Smiley 😃 -->
              <div :class="step === 4 ? 'flex justify-center pb-10' : 'hidden'">
                <img
                  src="https://cdn.quentinrobert.fr/yowl/logo-qui-tourne.gif"
                  alt="loader"
                />
              </div>
              <!-- Step 10 - CCedrc is that you-->
              <div
                :class="
                  step === 10 ? 'flex items-center pb-10 flex-col' : 'hidden'
                "
              >
                <img
                  src="https://cdn.quentinrobert.fr/yowl/cedric.gif"
                  alt="loader"
                  class="w-32 md:w-2/3"
                />
                <p class="text-red-500 pt-2">{{ this.errorMessage }}</p>
              </div>
              <!-- Step 20 - Marty is that you -->
              <div
                :class="
                  step === 20 ? 'flex items-center pb-10 flex-col' : 'hidden'
                "
              >
                <img
                  src="https://cdn.quentinrobert.fr/yowl/marty-is-that-you.gif"
                  alt="loader"
                  class=""
                />
                <p class="text-red-500 pt-2">{{ this.errorMessage }}</p>
              </div>
            </div>
            <!-- / Step Content -->
          </div>
        </div>

        <!-- Bottom Navigation -->
        <div class="bg-white">
          <div class="max-w-3xl mx-auto px-4">
            <div
              :class="
                step < 2
                  ? 'flex justify-center space-x-0'
                  : step == 10 || step == 20
                  ? 'flex justify-center space-x-0'
                  : 'flex justify-between space-x-7'
              "
            >
              <button
                @click="step === 1 ? (step = 1) : step--"
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
                :class="
                  step < 2
                    ? 'hidden'
                    : step == 4
                    ? 'hidden'
                    : step == 10
                    ? 'hidden'
                    : step == 20
                    ? 'hidden'
                    : ''
                "
              >
                Previous
              </button>

              <button
                @click="step === 3 ? (step = 3) : verif(step) && step++"
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
                :class="
                  step === 3
                    ? 'hidden'
                    : step == 4
                    ? 'hidden'
                    : step == 10
                    ? 'hidden'
                    : step == 20
                    ? 'hidden'
                    : ''
                "
              >
                Next
              </button>

              <div
                @click="inputs.length == 3 ? stepPlusPlusAndRegister() : ''"
                class="
                  flex
                  justify-center
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
                :class="
                  step < 3
                    ? 'hidden'
                    : step == 4
                    ? 'hidden'
                    : step == 10
                    ? 'hidden'
                    : step == 20
                    ? 'hidden'
                    : ''
                "
              >
                <button>Complete</button>
              </div>

              <div
                @click="step = 1"
                class="
                  flex
                  justify-center
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
                :class="step == 10 || step == 20 ? '' : 'hidden'"
              >
                <button>Try again</button>
              </div>
            </div>
          </div>
        </div>
        <!-- / Bottom Navigation https://placehold.co/300x300/e2e8f0/cccccc -->
        <div
          class="flex justify-center px-4 pt-4"
          :class="step == 4 ? 'hidden' : ''"
        >
          <router-link :to="{ name: 'Login' }">
            <p class="text-action-color hover:text-action-color-hover">
              Already have an account ?
            </p>
          </router-link>
        </div>
      </div>
    </form>
  </div>

</template>




<script>
import axios from "axios";
import { api_url } from "../../config.json";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export default {
  data() {
    return {
      step: 1,
      passwordStrength: "",
      togglePassword: false,
      password: "",
      passwordConfirmed: "",
      email: "",
      username: "",
      month: "",
      day: "",
      year: "",
      category_1: "",
      category_2: "",
      category_3: "",
      errorMessage: "",
      categories: [],
      inputs: [],
    };
  },
  mounted() {
    axios
      .get(api_url + "/categories")
      .then((result) => {
        this.categories = result.data;
      })
      .catch((error) => {
        console.error("There was an error" + error);
      });
  },
  computed: {
    checked() {
      return "cursor: pointer; padding: 2px 20px; border: 2px solid #F6A433 ; border-radius: 9999px ; color: #F6A433";
    },
    unchecked() {
      return "cursor: pointer; padding: 2px 20px; border: 2px solid gray; border-radius: 9999px; color: gray";
    },
  },
  methods: {
    stepPlusPlusAndRegister() {
      this.verif(1) && this.verif(2)
        ? this.step++ && this.register()
        : (this.step = 10);
    },
    verif(verif) {
      // let date = new Date();
      // let currentYear = date.getFullYear();
      // let currentMonth = date.getMonth();
      // let currentDay = date.getDay();
      // let dateActual = `${currentYear}/${currentMonth}/${currentDay}`;
      // let dateUser = `${this.year}/${this.month}/${this.day}`;

      // console.log(dateActual);
      // console.log(dateUser);
      const now = dayjs();
      dayjs.extend(customParseFormat);
      let dateUser = dayjs(
        `${this.month}-${this.day}-${this.year}`,
        "M-D-YYYY"
      );
      let minDate = now.subtract(13, "year");

      if (verif == 1) {
        if (
          this.username.length > 0 &&
          this.month > 0 &&
          this.day > 0 &&
          this.year > 0
        ) {
          if(this.year < 1900) { this.errorMessage = "The minimum year is 1900 !"; this.step = 1; return;}
          if (dateUser.isAfter(now)) {
            this.step = 20;
            this.errorMessage = "You can't be in the future";
            return false;
          } else if (dateUser.isAfter(minDate)) {
            console.log(minDate);
            this.step = 10;
            this.errorMessage = `You should be at least 13 years old`;
            return false;
          }
          this.errorMessage = "";
          return true;
        } else {
          this.errorMessage = "Empty Fields !";
          return false;
        }
      }

      if (verif == 2) {
        if (
          this.email.length > 0 &&
          this.password.length > 0 &&
          this.passwordConfirmed.length > 0
        ) {
          if (this.validateEmail(this.email)) {
            if (this.password == this.passwordConfirmed) {
              this.errorMessage = "";
              return true;
            } else {
              this.errorMessage = "Passwords don't match.";
              return false;
            }
          } else {
            this.errorMessage = "Please verify that this is a correct email.";
            return false;
          }
        } else {
          this.errorMessage = "Empty fields.";
          return false;
        }
      }
    },
    validateEmail(email) {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    },
    register() {
      let dayString = this.day < 10 ? "0" + this.day : this.day;
      let monthString = this.month < 10 ? "0" + this.month : this.month;
      const credentials = {
        username: this.username,
        email: this.email,
        password: this.password,
        birthdate: this.year + "/" + monthString + "/" + dayString,
        category_1: this.inputs[0],
        category_2: this.inputs[1],
        category_3: this.inputs[2],
      };
      if (
        credentials.category_1.length > 0 &&
        credentials.category_2.length > 0 &&
        credentials.category_3.length > 0 &&
        this.username.length > 0 &&
        this.month > 0 &&
        this.day > 0 &&
        this.year > 0 &&
        this.email.length > 0 &&
        this.password.length > 0 &&
        this.passwordConfirmed.length > 0 &&
        this.validateEmail(this.email) &&
        this.password == this.passwordConfirmed
      ) {
        axios
          .post(api_url + "/register", credentials)
          .then((result) => {
            this.bool = true;
            sessionStorage.setItem("token", result.data.jwt);
            sessionStorage.setItem("user", JSON.stringify(result.data));
            setTimeout(() => {
              this.$router.push("/");
            }, 4000);
            return true;
          })
          .catch((error) => {
            let code = error.response.status;

            code == 403
              ? (this.errorMessage = "You should be 13 years old to use Yowl")
              : code == 409
              ? (this.errorMessage = "This User already exist")
              : code == 400
              ? (this.errorMessage = "Empty field !")
              : (this.errorMessage = "There was an error");
            console.log(error.response.status);
            console.log("There was an error!", error);

            return false;
          });
        return;
      } else {
        this.errorMessage = "Please choose at least 3 categories.";
        return;
      }
    },
  },
};
</script>
<style scoped>
@keyframes animatedBackground {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 0 100%;
  }
}
#body {
  background-image: url(https://cdn.quentinrobert.fr/yowl/wave2.png);
  background-position: 0px 0px;
  background-repeat: repeat-y;
  animation: animatedBackground 60s linear infinite;
  background-size: cover;
}

[x-cloak] {
  display: none;
}

[type="et"] {
  box-sizing: border-box;
  padding: 0;
}

input[type="et"]:checked + label {
  color: green;
}

.form-et,
.form-radio {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  display: inline-block;
  vertical-align: middle;
  background-origin: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  flex-shrink: 0;
  color: currentColor;
  background-color: #fff;
  border-color: #e2e8f0;
  border-width: 1px;
  height: 1.4em;
  width: 1.4em;
}

.form-et {
  border-radius: 0.25rem;
}

.form-radio {
  border-radius: 50%;
}

.form-et:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  border-color: transparent;
  background-color: currentColor;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}

.form-radio:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
  border-color: transparent;
  background-color: currentColor;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}

.stepi {
  height: 15px;
  width: 15px;
  margin: 0 2px;
  /* background-color: #c3afaf; */
  border: none;
  border-radius: 50%;
  display: inline-block;
}
</style>


