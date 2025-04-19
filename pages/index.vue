<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TwitchService } from '~/services/TwitchService'
import LiveChannels from '~/components/LiveChannels.vue'
import Categories from '~/components/Categories.vue'
import Header from '~/components/Header.vue'
import Sidebar from '~/components/Sidebar.vue'

const streams = ref([])
const collapsed = ref(false)
const twitchService = new TwitchService()

onMounted(async () => {
  streams.value = await twitchService.getStreams()
})
</script>

<template>
  <div class="page">
    <Header />
    <div :class="['layout', { collapsed }]">
      <Sidebar :collapsed="collapsed" @toggle="collapsed = !collapsed" />
      <main class="main-content">
        <LiveChannels :streams="streams" :collapsed="collapsed" />
        <Categories />
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
  color: #fff;
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
