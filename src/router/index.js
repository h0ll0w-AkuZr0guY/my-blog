import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { 
    path: '/interviews', 
    name: 'Interviews', 
    component: () => import('../views/Interviews.vue') 
  },
  { 
    path: '/article/:id', 
    name: 'ArticleDetail', 
    component: () => import('../views/ArticleDetail.vue'),
    props: true // 允许将路由参数 id 作为 prop 传给组件
  }
]

const router = createRouter({
  // 对于 GitHub Pages，推荐使用 Hash 模式，避免刷新 404
  history: createWebHashHistory(),
  routes,
})

export default router