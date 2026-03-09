<script setup>
import { onMounted } from 'vue'
import { useBlogData } from './composables/useBlogData'

const { loadData, filteredArticles, isLoading, error } = useBlogData()

onMounted(() => {
  loadData()
})
</script>

<template>
  <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: sans-serif;">
    <h1>我的面经博客</h1>
    
    <div v-if="isLoading" style="color: #666;">数据加载中，请稍候...</div>
    <div v-else-if="error" style="color: red;">加载出错：{{ error }}</div>
    
    <div v-else>
      <div v-if="filteredArticles.length === 0" style="color: #999;">暂无文章数据</div>
      
      <div v-for="article in filteredArticles" :key="article.id" style="border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 20px; padding: 20px; text-align: left;">
        <h2 style="margin-top: 0;">{{ article.title }}</h2>
        <p style="color: #64748b; font-size: 0.9em;">
          创建时间: {{ new Date(article.createTime).toLocaleString() }}
        </p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 15px 0;" />
        <pre style="white-space: pre-wrap; word-wrap: break-word; color: #334155; font-family: inherit;">{{ article.content.substring(0, 200) }}...</pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 可以在这里把 Vite 默认自带的样式清掉，或者直接去 style.css 里清空 */
</style>