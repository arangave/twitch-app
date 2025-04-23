<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import Header from '~/components/Header.vue'
import Sidebar from '~/components/Sidebar.vue'
// <<< IMPORTA EL COMPOSABLE
import { useSidebar } from '~/composables/useSidebar'

const { collapsed, toggle } = useSidebar()

const isMobile = ref(false)
function updateIsMobile() {
  isMobile.value = window.innerWidth < 768
}
onMounted(() => {
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIsMobile)
})

const showContent = computed(() => {
  // en móvil sólo muestro contenido si el sidebar está colapsado
  return !isMobile.value || collapsed.value
})
</script>

<template>
  <div class="page">
    <Header />

    <div :class="['layout', { collapsed }]">
      <Sidebar :collapsed="collapsed" @toggle="toggle" />

      <main v-show="showContent" class="main-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}
.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  transition: all 0.3s;
}
</style>
