// composables/useSidebar.ts
import { ref, watch, onMounted } from 'vue'

const STORAGE_KEY = 'sidebar-collapsed'

export function useSidebar() {
  // 1) Estado inicial en false (SSR-friendly)
  const collapsed = ref(false)

  // 2) En cliente, leemos localStorage y arrancamos el watcher
  onMounted(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved !== null) {
      collapsed.value = saved === 'true'
    }
    watch(collapsed, (val) => {
      localStorage.setItem(STORAGE_KEY, String(val))
    })
  })

  // 3) Función para alternar
  function toggle() {
    collapsed.value = !collapsed.value
  }

  return { collapsed, toggle }
}
