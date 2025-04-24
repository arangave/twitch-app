<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import Header from '~/components/Header.vue'
import Sidebar from '~/components/Sidebar.vue'

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
  return !isMobile.value || collapsed.value
})
</script>

<template>
  <div class="page">
    <Header class="header-fixed" />

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

  max-width: 120rem;
  margin: 0 auto;
  width: 100%;
}

.layout {
  display: flex;
  flex: 1;
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  transition: all 0.3s;
}
.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}
.header-fixed {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #0e0e10;
  padding: 1rem 2rem;
}
</style>
