import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome-view',
      component: require('@/components/WelcomeView').default
    },
    {
      path: '/recAll',
      name: 'recAll',
      component: require('@/components/RecipeAll').default
    },
    {
      path: '/recAdd',
      name: 'recAdd',
      component: require('@/components/RecipeAdd').default
    },
    {
      path: '/recDet',
      name: 'recDet',
      component: require('@/components/RecipeDetail').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
