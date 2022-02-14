import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ResetPassword from '../views/Reset-password.vue'
import ChangePassword from '../views/Change-password.vue'
import accountPage from '../views/Account-page.vue'
import Hot from '../views/Hot.vue'
import MostRecent from '../views/Most-recent.vue'
import Categories from '../views/Categories.vue'
import Test from '../views/test.vue'
import ProfileAnyUser from '../views/Account-page-any-user.vue'

const routes = [
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/reset-password',
    name: 'Reset-password',
    component: ResetPassword
  },
  {
    path: '/change-password',
    name: 'Change-password',
    component: ChangePassword
  },
  {
    path: '/account-page',
    name: 'Account-page',
    component: accountPage
  },
  {
    path: '/sport',
    name: 'Sport',
    component: Categories
  },
  {
    path: '/tech',
    name: 'Tech',
    component: Categories
  },
  {
    path: '/game',
    name: 'Game',
    component: Categories
  },
  {
    path: '/photo-video',
    name: 'Photo-video',
    component: Categories
  },
  {
    path: '/music',
    name: 'Music',
    component: Categories
  },
  {
    path: '/art',
    name: 'Art',
    component: Categories
  },
  {
    path: '/book',
    name: 'Book',
    component: Categories
  },
  {
    path: '/beauty',
    name: 'Beauty',
    component: Categories
  },
  {
    path: '/movie-series',
    name: 'Movie-series',
    component: Categories
  },
  {
    path: '/toys',
    name: 'Toys',
    component: Categories
  },
  {
    path: '/food',
    name: 'Food',
    component: Categories
  },
  {
    path: '/hot',
    name: 'Hot',
    component: Hot
  },
  {
    path: '/most-recent',
    name: 'MostRecent',
    component: MostRecent
  },
  {
    path: '/profile/:id',
    name: 'ProfileAnyUser',
    component: ProfileAnyUser
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
