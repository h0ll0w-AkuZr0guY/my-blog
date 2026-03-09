<script setup>
defineProps({
  toc: { type: Array, required: true },
  isOpen: { type: Boolean, default: true }
})

defineEmits(['close', 'jump'])
</script>

<template>
  <transition name="slide-fade">
    <div v-show="isOpen" class="fixed top-24 right-4 sm:right-8 w-64 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 p-5 max-h-[75vh] overflow-y-auto z-40">
      <div class="flex justify-between items-center mb-4 border-b pb-2">
        <h3 class="text-base font-bold text-gray-800 flex items-center gap-2">
          <span>📑</span> 文章目录
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-700 text-lg transition">✕</button>
      </div>
      
      <div v-if="toc.length === 0" class="text-sm text-gray-400 text-center py-4">暂无目录</div>
      
      <ul class="space-y-2">
        <li v-for="item in toc" :key="item.id" :style="{ paddingLeft: `${(item.level - 2) * 12}px` }">
          <div 
            @click="$emit('jump', item.id)" 
            class="text-sm text-gray-600 hover:text-indigo-600 truncate cursor-pointer transition select-none"
            :title="item.text"
          >
            {{ item.text }}
          </div>
        </li>
      </ul>
    </div>
  </transition>
</template>

<style scoped>
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>