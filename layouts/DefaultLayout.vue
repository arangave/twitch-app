<script setup lang="ts">
import Header from '~/components/Header.vue'
import Sidebar from '~/components/Sidebar.vue'
import { ref } from 'vue'

const collapsed = ref(false)
</script>

<template>
  <div class="page">
    <Header />
    <div :class="['layout', { collapsed }]">
      <Sidebar :collapsed="collapsed" @toggle="collapsed = !collapsed" />
      <main class="main-content">
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
  background-color: #0e0e10;
  color: #070707;
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
  transition: all 0.3s ease;
}
</style>
