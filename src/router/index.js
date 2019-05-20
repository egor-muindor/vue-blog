import Vue from 'vue'
import Router from 'vue-router'
/* */
import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
/* */
import Main from '@/components/Main'
import Categories from '@/components/Categories'
import Category from '@/components/Category'
import Post from '@/components/Post'
import CreatePost from '@/components/CreatePost'
import EditPost from '@/components/EditPost'
import CreateCategory from '@/components/CreateCategory'
import EditCategory from '@/components/EditCategory'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(BootstrapVue)
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/post/create',
      name: 'CreatePost',
      component: CreatePost
    },
    {
      path: '/post/:id/edit',
      name: 'EditPost',
      component: EditPost
    },
    {
      path: '/post/:id',
      name: 'Post',
      component: Post
    },
    {
      path: '/category/create',
      name: 'CreateCategory',
      component: CreateCategory
    },
    {
      path: '/category/:id/edit',
      name: 'EditCategory',
      component: EditCategory
    },
    {
      path: '/category/:id',
      name: 'Category',
      component: Category
    },
    {
      path: '/category/',
      name: 'Categories',
      component: Categories
    }
  ]
})
