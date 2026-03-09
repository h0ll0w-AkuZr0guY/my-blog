import { ref, computed } from 'vue'

const rawData = ref(null)
const isLoading = ref(false)
const error = ref(null)

const config = ref({
  showInterviews: true,
  showAlgorithms: false 
})

const RAW_BASE_URL = 'https://raw.githubusercontent.com/h0ll0w-AkuZr0guY/lcp-data/main'

export function useBlogData() {
  const loadData = async () => {
    if (rawData.value) return 

    isLoading.value = true
    error.value = null
    try {
      const res = await fetch(`${RAW_BASE_URL}/data.json`)
      if (!res.ok) throw new Error('网络请求失败')
      rawData.value = await res.json()
    } catch (err) {
      error.value = err.message
      console.error('获取博客数据失败:', err)
    } finally {
      isLoading.value = false
    }
  }

  const processImagePaths = (markdownContent) => {
    if (!markdownContent) return ''
    return markdownContent
      // 兼容带 / 和不带 / 的路径
      .replace(/\]\(\/?(images\/[^)]+)\)/g, `](${RAW_BASE_URL}/$1)`)
      .replace(/src=["']\/?(images\/[^"']+)["']/g, `src="${RAW_BASE_URL}/$1"`)
  }

  const filteredArticles = computed(() => {
    // 确保拿到的是数组
    if (!Array.isArray(rawData.value)) return []
    
    let result = []
    
    // 遍历你的一维数组数据
    rawData.value.forEach(item => {
      // 过滤面经
      if (config.value.showInterviews && item.type === 'interview') {
        result.push({
          ...item,
          // 你的正文在 problemText 里
          content: processImagePaths(item.problemText) 
        })
      }
      // 过滤算法
      if (config.value.showAlgorithms && item.type === 'algorithm') {
        result.push({
          ...item,
          content: processImagePaths(item.problemText)
        })
      }
    })
    
    // 使用 id (时间戳字符串) 进行降序排序，最新的在前面
    return result.sort((a, b) => parseInt(b.id) - parseInt(a.id))
  })

  return { loadData, filteredArticles, config, isLoading, error }
}