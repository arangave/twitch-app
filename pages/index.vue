<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TwitchService } from '~/services/TwitchService'
import StreamCard from '~/components/StreamCard.vue'

const streams = ref([])
const twitchService = new TwitchService()

onMounted(async () => {
  streams.value = await twitchService.getStreams()
})
</script>

<template>
  <section class="grid-streams">
    <StreamCard v-for="stream in streams" :key="stream.id" :stream="stream" />
  </section>
</template>

<style scoped lang="scss">
.grid-streams {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}
</style>
