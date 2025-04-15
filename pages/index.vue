<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TwitchService } from '~/services/TwitchService'
import StreamCard from '~/components/StreamCard.vue'
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
        <section class="grid-streams">
          <StreamCard v-for="stream in streams" :key="stream.id" :stream="stream" />
        </section>
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

.grid-streams {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(17.5rem, 1fr));
  gap: 1.5rem;
}
</style>
