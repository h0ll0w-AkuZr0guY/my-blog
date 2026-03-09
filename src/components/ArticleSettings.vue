<script setup>
import { ref } from 'vue'
import { useSettings } from '../composables/useSettings'

const { globalFontSize, codeFontSize, increaseGlobalFont, decreaseGlobalFont, increaseCodeFont, decreaseCodeFont } = useSettings()
const showPanel = ref(false)

defineEmits(['toggle-toc'])

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <div class="fixed bottom-8 right-4 sm:right-8 flex flex-col items-end gap-3 z-50">
    
    <transition name="fade-up">
      <div v-if="showPanel" class="bg-white p-4 rounded-xl shadow-xl border border-gray-200 mb-1 w-48 text-sm origin-bottom-right">
        <div class="mb-4">
          <div class="text-gray-500 mb-1 flex justify-between"><span>正文字体</span> <span class="text-indigo-600">{{ globalFontSize }}px</span></div>
          <div class="flex gap-2">
            <button @click="decreaseGlobalFont" class="flex-1 bg-gray-100 hover:bg-gray-200 text-lg font-bold rounded py-1 transition">-</button>
            <button @click="increaseGlobalFont" class="flex-1 bg-gray-100 hover:bg-gray-200 text-lg font-bold rounded py-1 transition">+</button>
          </div>
        </div>
        <div>
          <div class="text-gray-500 mb-1 flex justify-between"><span>代码字体</span> <span class="text-indigo-600">{{ codeFontSize }}px</span></div>
          <div class="flex gap-2">
            <button @click="decreaseCodeFont" class="flex-1 bg-gray-100 hover:bg-gray-200 text-lg font-bold rounded py-1 transition">-</button>
            <button @click="increaseCodeFont" class="flex-1 bg-gray-100 hover:bg-gray-200 text-lg font-bold rounded py-1 transition">+</button>
          </div>
        </div>
      </div>
    </transition>

    <div class="flex flex-col gap-2">
      <button @click="$emit('toggle-toc')" title="切换目录" class="w-10 h-10 bg-white text-gray-700 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition">
        📑
      </button>
      <button @click="showPanel = !showPanel" title="排版设置" class="w-10 h-10 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 flex items-center justify-center transition">
        ⚙️
      </button>
      <button @click="scrollToTop" title="回到顶部" class="w-10 h-10 bg-white text-gray-700 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition">
        ↑
      </button>
    </div>
  </div>
</template>

<style scoped>
.fade-up-enter-active, .fade-up-leave-active { transition: all 0.2s ease; }
.fade-up-enter-from, .fade-up-leave-to { opacity: 0; transform: translateY(10px) scale(0.95); }
</style>