import { ref, computed } from 'vue'

const rawData = ref(null)
const config = ref({
  showInterviews: true,
  showAlgorithms: false // 暂时不需要，但保留开启接口
})

export function useBlogData() {
  const loadData = async () => {
    const res = await fetch('https://github.com/h0ll0w-AkuZr0guY/lcp-data/main/data.json')
    rawData.value = await res.json()
  }

  const filteredArticles = computed(() => {
    if (!rawData.value) return []
    let result = []
    
    // 假设你的 data.json 结构里有分类标记
    if (config.value.showInterviews) {
      result = result.concat(rawData.value.interviews || [])
    }
    if (config.value.showAlgorithms) {
      result = result.concat(rawData.value.algorithms || [])
    }
    
    return result.sort((a, b) => b.createTime - a.createTime)
  })

  return { loadData, filteredArticles, config }
}