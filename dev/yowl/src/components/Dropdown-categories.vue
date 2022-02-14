<template>
  <div class="md:w-2/6 text-right">
    <Menu as="div" class="relative inline-block text-left h-full w-full">
      <div class="w-full h-full">
        <MenuButton
          class="
            inline-flex
            justify-between
            px-4
            items-center
            w-full
            py-2
            h-full
            text-sm
            font-medium
            text-white
            bg-action-color
            rounded-md
            bg-opacity-80
            hover:bg-opacity-85
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-white
            focus-visible:ring-opacity-75
          "
        >
          <img v-if="currentCategory" class="h-5" :src="`https://cdn.quentinrobert.fr/yowl/icons/${currentCategory}-white.svg`" :alt="currentCategory">
          {{currentCategory || "Category"}}
          <ChevronDownIcon
            class="
              w-5
              h-5
              ml-2
              -mr-1
              text-violet-200
              hover:text-violet-100
              chevron
              transition
              duration-300
              ease-in-out
            "
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
            right-0
            w-full
            mt-2
            h-76
            overflow-y-scroll
            origin-top-right
            bg-white
            divide-y divide-gray-100
            rounded-md
            shadow-lg
            ring-1 ring-black ring-opacity-5
            focus:outline-none
          "
        >
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }" v-for="category in categories" v-bind:key="category.id">
              <div
                @click="replaceCat(category.name)"
                :class="[
                  active ? ' bg-action-color text-white' : 'text-gray-900',
                  'group flex rounded-md justify-start items-center cursor-pointer w-full px-2 py-2 text-sm',
                ]"
              >
                <img :src="[active ? category.icon : category.base]" class="h-5" alt="Category icon">
                <p class="absolute left-14">{{category.name}}</p>
              </div>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/solid";

export default {
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    ChevronDownIcon,
  },
  data() {
    return {
      currentCategory: null,
    }
  },
  mounted() {
    if(this.currentCat) this.replaceCat(this.currentCat);
  },
  watch: {
    currentCat: function (newVal) {
      this.replaceCat(newVal.toLowerCase());
    }
  },
  props: ["categories", "currentCat"],
  methods: {
    replaceCat(that) {
      this.currentCategory = that;
      this.$emit('currentCategory', that);
      return;
    },
  },
};
</script>

<style>
#headlessui-menu-button-1[aria-expanded="true"] > .chevron {
  transform: rotate(180deg);
}
</style>