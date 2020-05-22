import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/views/login/Login'
/* Layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
    {path: '/login', component: () => import('@/views/login/login'), hidden: true},
    {
      path: '',
      component: Layout,
      redirect: '/home',
      children: [{
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: {title: '首页', icon: 'home'}
      }]
    },
    {
      path: '/resume',
      component: Layout,
      redirect: '/resume',
      children: [{
        path: 'resume',
        name: 'resume',
        component: () => import('@/views/resume/index'),
        meta: {title: '简历', icon: 'home'}
      },
      {
        path: 'updateResume',
        name: 'updateResume',
        component: () => import('@/views/resume/update'),
        meta: {title: '修改简历', icon: 'product-add'},
        hidden: true
      },]
    }
    // {
    //   // path: '/resume',
    //   // component: Layout,
    //   // // redirect: '/pms/product',
    //   // name: 'resume',
    //   // meta: {title: '简历', icon: 'product'},
    //   // children: [{
    //     path: 'resume',
    //     name: 'resume',
    //     component: () => import('@/views/resume/index'),
    //     meta: {title: '商品列表', icon: 'product-list'}
    //   // },
    //   // {
    //   //   path: 'order',
    //   //   name: 'order',
    //   //   component: () => import('@/views/pms/order/index'),
    //   //   meta: {title: '订单', icon: 'order-list'}
    //   // }]
    // }
  ]


export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})