import { ref, watch } from 'vue'

// 从本地存储读取，保证刷新不丢失
const globalFontSize = ref(parseInt(localStorage.getItem('blog_global_font')) || 16)
const codeFontSize = ref(parseInt(localStorage.getItem('blog_code_font')) || 14)

watch(globalFontSize, (val) => localStorage.setItem('blog_global_font', val))
watch(codeFontSize, (val) => localStorage.setItem('blog_code_font', val))

export function useSettings() {
  const increaseGlobalFont = () => globalFontSize.value = Math.min(globalFontSize.value + 2, 24)
  const decreaseGlobalFont = () => globalFontSize.value = Math.max(globalFontSize.value - 2, 12)
  
  const increaseCodeFont = () => codeFontSize.value = Math.min(codeFontSize.value + 2, 20)
  const decreaseCodeFont = () => codeFontSize.value = Math.max(codeFontSize.value - 2, 10)

  return {
    globalFontSize, codeFontSize,
    increaseGlobalFont, decreaseGlobalFont,
    increaseCodeFont, decreaseCodeFont
  }
}