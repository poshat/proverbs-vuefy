import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Categories from '@/components/Categories'
import Countries from '@/components/Countries'
import Authors from '@/components/Authors'
import Search from '@/components/Search'
import New from '@/components/New'
import Edit from '@/components/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/categories',
      component: Categories
    },
    {
      path: '/countries',
      component: Countries
    },
    {
      path: '/authors',
      component: Authors
    },
    {
      path: '/search/:id/:type/:text',
      name: 'Search',
      component: Search
    },
    {
      path: '/new',
      component: New
    },
    {
      path: '/edit/:id',
      name: 'Edit',
      component: Edit
    }
  ]
})
