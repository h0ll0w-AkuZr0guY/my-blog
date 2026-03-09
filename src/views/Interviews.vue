<script setup>
import { useRouter } from 'vue-router'
import { useBlogData } from '../composables/useBlogData'

const router = useRouter()
const { filteredArticles, isLoading, error } = useBlogData()

const goToDetail = (id) => {
  router.push(`/article/${id}`)
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">面经归档</h2>
    
    <div v-if="isLoading" class="text-gray-500 animate-pulse">数据努力加载中...</div>
    <div v-else-if="error" class="text-red-500 bg-red-50 p-4 rounded-md">{{ error }}</div>
    <div v-else-if="filteredArticles.length === 0" class="text-gray-400">暂无内容</div>
    
    <div v-else class="space-y-6">
      <div 
        v-for="article in filteredArticles" 
        :key="article.id" 
        @click="goToDetail(article.id)"
        class="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-indigo-300 transition cursor-pointer group"
      >
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition">{{ article.title }}</h3>
          <span class="text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
            {{ article.category || '未分类' }}
          </span>
        </div>
        <p class="text-sm text-gray-400 mb-4">
          {{ new Date(parseInt(article.id)).toLocaleDateString() }}
        </p>
        <p class="text-gray-600 text-sm line-clamp-3 leading-relaxed">
          {{ article.content.replace(/[#*`>]/g, '').substring(0, 150) }}...
        </p>
      </div>
    </div>
  </div>
</template>