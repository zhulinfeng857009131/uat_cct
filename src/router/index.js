import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/402',
    component: () => import('@/views/402'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
 {
    path: '/updateProfile',
    component: () => import('@/views/updateProfile'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'index',
      component: () => import('@/views/index/index'),
      meta: { title: '解决方案列表'}
    }]
  },

  {
    path: '/solution',
    component: Layout,
    redirect: '/solution/add',
    name: 'solution',
    children: [
      {
        path: 'add',
        component: () => import('@/views/solution/add'),
        name: 'solutionAdd',
        meta: { title: '新建解决方案',  affix: true }
      },
      {
        path: 'detail',
        component: () => import('@/views/solution/detail'),
        name: 'solutionDetail',
        meta: { title: '解决方案详情',  affix: true }
      },
      {
        path: 'complete',//完善解决方案
        component: () => import('@/views/solution/complete'),
        name: 'solutionComplete',
        meta: { title: '解决方案概览',  affix: true }
      },
			{
			  path: 'check',//解决方案审核
			  component: () => import('@/views/solution/check'),
			  name: 'solutionComplete',
			  meta: { title: '解决方案审核',  affix: true }
			},
    ]
  },

  {
    path: '/imdc',
    component: Layout,
    redirect: '/imdc/imdc-list',
    name: 'imdc',
    meta: {
      title: 'imdc-解决方案'
    },
    children: [
      {
        path: 'imdc-list',
        component: () => import('@/views/imdc/imdc-list'),
        name: 'imdc-list',
        meta: { title: 'imdc-解决方案',  affix: true }
      },
      {
        path: 'imdc-row-list',
        component: () => import('@/views/imdc/imdc-row-list'),
        name: 'imdc-row-list',
        meta: { title: 'imdc-row-list-解决方案',  affix: true }
      },
    ]
  },
  // 新品推荐
  {
    path: '/product',
    component: Layout,
    redirect: '/product/index',
    name: 'product',
    children: [
      {
        path: 'index',
        component: () => import('@/views/product/index'),
        name: 'index',
        meta: { title: '新品推荐',  affix: true }
      },
      {
        path: 'detail',
        component: () => import('@/views/product/detail'),
        name: 'detail',
        meta: { title: 'IMDC - 详情',  affix: true }
      },
      {
        path: 'detailGalaxyPW',
        component: () => import('@/views/product/detailGalaxyPW'),
        name: 'detail',
        meta: { title: 'Galaxy PW 2nd Gen - 详情',  affix: true }
      },
      {
        path: 'detailGalaxy',
        component: () => import('@/views/product/detailGalaxy'),
        name: 'detail',
        meta: { title: 'Galaxy - 详情',  affix: true }
      },
      {
        path: 'detailITE',
        component: () => import('@/views/product/detailITE'),
        name: 'detail',
        meta: { title: 'ITE风云汇 - 详情',  affix: true }
      },
      {
        path: 'detailEasy',
        component: () => import('@/views/product/detailEasy'),
        name: 'detail',
        meta: { title: 'Easy Cooling - 详情',  affix: true }
      }
    ]
  },
{
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    name: 'user',
    meta: {
      title: '会员列表'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/user/index'),
        name: 'index',
        meta: { title: '会员列表',  affix: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
  { path: '*', redirect: '/402', hidden: true },
  { path: '*', redirect: '/updateProfile', hidden: true }
]

const createRouter = () => new Router({
  mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
