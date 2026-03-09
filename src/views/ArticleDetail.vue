<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogData } from '../composables/useBlogData'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
// 引入 highlight.js 的一种暗色主题样式
import 'highlight.js/styles/atom-one-dark.css'

const route = useRoute()
const router = useRouter()
const { filteredArticles } = useBlogData()
const article = ref(null)

// 初始化 Markdown 解析器并配置代码高亮
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
               '</code></pre>';
      } catch (__) {}
    }
    // 未指定语言时
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
})

// 监听路由参数变化，并匹配对应的数据
watchEffect(() => {
  const id = route.params.id
  if (filteredArticles.value.length > 0) {
    const found = filteredArticles.value.find(a => a.id === id)
    if (found) {
      article.value = found
    }
  }
})
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-10">
    <button 
      @click="router.back()" 
      class="text-sm text-indigo-600 hover:text-indigo-800 mb-6 flex items-center transition"
    >
      &larr; 返回列表
    </button>

    <div v-if="!article" class="text-gray-500 py-10 text-center animate-pulse">
      正在加载文章内容...
    </div>

    <article v-else class="prose prose-indigo max-w-none prose-img:rounded-lg prose-img:shadow-md">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">{{ article.title }}</h1>
      <div class="flex items-center gap-4 text-sm text-gray-500 mb-10 pb-6 border-b border-gray-100">
        <span>🕒 {{ new Date(parseInt(article.id)).toLocaleString() }}</span>
        <span class="bg-gray-100 px-2 py-0.5 rounded">{{ article.category }}</span>
        <span class="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded">{{ article.difficulty || '难度未知' }}</span>
      </div>
      
      <div class="markdown-body" v-html="md.render(article.content)"></div>
    </article>
  </div>
</template>

<style>
/* 针对 Markdown 内容的一些基础排版重置 */
.markdown-body h1, .markdown-body h2, .markdown-body h3 {
  @apply font-bold text-gray-900 mt-8 mb-4;
}
.markdown-body h2 {
  @apply text-2xl border-b pb-2;
}
.markdown-body h3 {
  @apply text-xl;
}
.markdown-body p {
  @apply text-gray-700 leading-relaxed mb-4;
}
.markdown-body ul {
  @apply list-disc list-inside mb-4 space-y-1 text-gray-700;
}
.markdown-body code:not(.hljs code) {
  @apply bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded-md text-sm font-mono;
}
.markdown-body pre.hljs {
  @apply rounded-xl p-4 my-6 overflow-x-auto text-sm;
}
</style>