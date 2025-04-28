<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TwitchService } from '~/services/TwitchService'
import LiveChannels from '~/components/LiveChannels.vue'
import Categories from '~/components/Categories.vue'

const streams = ref<any[]>([])
const twitchService = new TwitchService()

onMounted(async () => {
  streams.value = await twitchService.getStreams(50)
})
</script>

<template>
  <LiveChannels :streams="streams" />
  <LiveChannels :streams="streams" />
  <Categories />
  <LiveChannels :streams="streams" />
  <LiveChannels :streams="streams" />
</template>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: $background-dark;
  color: $text-light;
}

.layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1rem;
  transition: all 0.3s;
}
</style>
