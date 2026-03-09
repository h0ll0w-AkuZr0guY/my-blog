<script setup>
import { onMounted } from 'vue'
import { useBlogData } from './composables/useBlogData'

// 在根组件统一触发一次数据拉取，供全局路由使用
const { loadData } = useBlogData()

onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col">
    <nav class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex-shrink-0 flex items-center cursor-pointer" @click="$router.push('/')">
            <span class="font-bold text-xl text-indigo-600">H0ll0w's Blog</span>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link to="/" class="nav-link" active-class="nav-link-active">首页</router-link>
            <router-link to="/interviews" class="nav-link" active-class="nav-link-active">面经归档</router-link>
            <a href="https://github.com/h0ll0w-akuzr0guy" target="_blank" class="nav-link">GitHub</a>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="bg-white border-t border-gray-200 py-6 mt-auto">
      <div class="max-w-5xl mx-auto px-4 text-center text-sm text-gray-500">
        &copy; {{ new Date().getFullYear() }} H0ll0w-akuzr0guy. Built with Vue 3 & Tailwind CSS.
      </div>
    </footer>
  </div>
</template>

<style scoped>
.nav-link {
  @apply text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium transition-colors duration-200;
}
.nav-link-active {
  @apply border-indigo-500 text-gray-900;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>