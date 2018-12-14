import Vue from 'vue'
import Router from 'vue-router'
import POS from '@/components/page/Pos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'POS',
      component: POS
    }
  ]
})
