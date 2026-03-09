<script setup>
import { ref, watchEffect, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogData } from '../composables/useBlogData'
import { useSettings } from '../composables/useSettings'

import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import mathjax3 from 'markdown-it-mathjax3'

import TocPanel from '../components/TocPanel.vue'
import ArticleSettings from '../components/ArticleSettings.vue'

const route = useRoute()
const router = useRouter()
const { filteredArticles } = useBlogData()
const { globalFontSize, codeFontSize } = useSettings()

const article = ref(null)
const tocList = ref([])
const showToc = ref(true)

// 去掉 highlight 选项，不要让它自作主张包装代码
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

// 【核心修复】：拦截底层 fence 渲染规则，彻底摆脱多余的 <pre> 包装框
md.renderer.rules.fence = function (tokens, idx, options, env, self) {
  const token = tokens[idx]
  const lang = token.info.trim()
  const code = token.content

  let highlighted = md.utils.escapeHtml(code)
  if (lang && hljs.getLanguage(lang)) {
    try {
      highlighted = hljs.highlight(code, { language: lang, ignoreIllegals: true }).value
    } catch (__) {}
  }
  
  // 切除首尾隐藏空行
  highlighted = highlighted.replace(/^\n+|\n+$/g, '')

  // 直接返回这段 HTML，没有任何外层包裹
  return `
    <div class="not-prose code-block-wrapper my-6 rounded-lg bg-[#1e1e1e] ring-1 ring-[#333] shadow-md overflow-hidden flex flex-col font-sans">
      <div class="flex justify-between items-center px-4 py-1.5 bg-[#252526] border-b border-[#333]">
        <span class="text-[11px] font-mono text-[#858585] lowercase tracking-wider select-none">${lang || 'text'}</span>
        <button class="copy-btn text-[#858585] hover:text-[#cccccc] transition-colors text-[11px] flex items-center gap-1 cursor-pointer py-1 px-2 rounded hover:bg-[#333333]">
          <svg class="w-3 h-3 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
          <span class="pointer-events-none font-medium">Copy</span>
        </button>
      </div>
      <pre class="!m-0 !py-3 !px-4 overflow-x-auto"><code class="language-${lang} hljs !bg-transparent text-[#d4d4d4]" style="font-size: var(--code-size); line-height: 1.5; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;">${highlighted}</code></pre>
    </div>
  `
}

md.use(mathjax3)

md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
  const token = tokens[idx]
  token.attrSet('id', `heading-${idx}`)
  return self.renderToken(tokens, idx, options)
}

const generateToc = () => {
  const headers = document.querySelectorAll('.markdown-body h2, .markdown-body h3, .markdown-body h4')
  tocList.value = Array.from(headers).map(h => {
    return { 
      id: h.id, 
      text: h.textContent.trim(), 
      level: parseInt(h.tagName.replace('H', '')) 
    }
  }).filter(item => item.id)
}

const handleJump = (id) => {
  const el = document.getElementById(id)
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 80 
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

watchEffect(async () => {
  const id = route.params.id
  if (filteredArticles.value.length > 0) {
    article.value = filteredArticles.value.find(a => a.id === id)
    if (article.value) {
      await nextTick()
      generateToc()
    }
  }
})

const handleCopy = (e) => {
  const btn = e.target.closest('.copy-btn')
  if (btn) {
    const codeBlock = btn.closest('.code-block-wrapper').querySelector('code')
    navigator.clipboard.writeText(codeBlock.innerText).then(() => {
      const originalHTML = btn.innerHTML
      btn.innerHTML = '<span class="text-green-500 font-medium">✔ Copied</span>'
      setTimeout(() => {
        btn.innerHTML = originalHTML
      }, 2000)
    })
  }
}
</script>

<template>
  <div class="relative w-full">
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-12 mx-auto max-w-4xl">
      <button @click="router.back()" class="text-sm text-indigo-600 hover:text-indigo-800 mb-8 flex items-center transition">
        &larr; 返回列表
      </button>

      <div v-if="!article" class="text-gray-500 py-10 text-center animate-pulse">正在加载文章内容...</div>

      <article v-else 
        @click="handleCopy"
        class="markdown-body prose prose-indigo max-w-none prose-img:rounded-lg prose-img:shadow-sm prose-table:border-collapse prose-th:bg-gray-50 prose-th:p-3 prose-td:p-3 prose-td:border prose-th:border"
        :style="{ '--code-size': codeFontSize + 'px', fontSize: globalFontSize + 'px' }"
      >
        <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{{ article.title }}</h1>
        <div class="flex items-center gap-4 text-sm text-gray-500 mb-10 pb-6 border-b border-gray-100 not-prose">
          <span>🕒 {{ new Date(parseInt(article.id)).toLocaleString() }}</span>
          <span class="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium">{{ article.category || '未分类' }}</span>
        </div>
        
        <div v-html="md.render(article.content)"></div>
      </article>
    </div>

    <TocPanel 
      :toc="tocList" 
      :isOpen="showToc" 
      @close="showToc = false" 
      @jump="handleJump" 
    />

    <ArticleSettings @toggle-toc="showToc = !showToc" />
  </div>
</template>

<style>
/* 保证行内代码仍然有好看的样式 */
.prose code::before, .prose code::after {
  content: none !important;
}
.prose code:not(.hljs) {
  @apply bg-gray-100 text-indigo-600 px-1.5 py-0.5 rounded-md font-mono text-[0.875em] font-normal border border-gray-200;
}

.prose blockquote p:first-of-type::before, .prose blockquote p:last-of-type::after { 
  content: none !important;
}

/* 公式排版优化 */
mjx-container[display="true"] {
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0.5rem 0;
  margin: 1rem 0;
}
</style>