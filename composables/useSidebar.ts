import { ref, watch, onMounted } from 'vue'

const STORAGE_KEY = 'sidebar-collapsed'

export function useSidebar() {
  const collapsed = ref(false)

  onMounted(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved !== null) collapsed.value = saved === 'true'
    watch(collapsed, (val) => {
      localStorage.setItem(STORAGE_KEY, String(val))
    })
  })

  const toggle = () => {
    collapsed.value = !collapsed.value
  }

  return { collapsed, toggle }
}
