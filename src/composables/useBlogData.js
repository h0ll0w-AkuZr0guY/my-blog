import { ref, computed } from 'vue'

const rawData = ref(null)
const isLoading = ref(false)
const error = ref(null)

const config = ref({
  showInterviews: true,
  showAlgorithms: false 
})

// 必须使用 raw 地址，否则取到的是 HTML 网页
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

  // 将 data.json 里的本地相对路径图片，转换为完整的 Github Raw 在线图片
  const processImagePaths = (markdownContent) => {
    if (!markdownContent) return ''
    return markdownContent
      .replace(/\]\((images\/[^)]+)\)/g, `](${RAW_BASE_URL}/$1)`)
      .replace(/src=["'](images\/[^"']+)["']/g, `src="${RAW_BASE_URL}/$1"`)
  }

  const filteredArticles = computed(() => {
    if (!rawData.value) return []
    let result = []
    
    if (config.value.showInterviews && rawData.value.interviews) {
      const interviews = rawData.value.interviews.map(item => ({
        ...item,
        type: 'interview',
        content: processImagePaths(item.content) 
      }))
      result = result.concat(interviews)
    }
    
    return result.sort((a, b) => (b.createTime || 0) - (a.createTime || 0))
  })

  return { loadData, filteredArticles, config, isLoading, error }
}