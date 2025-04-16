<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { VideoService } from '~/services/VideoService'

const route = useRoute()
const videoService = new VideoService()

const streamDetails = ref(null)
const videoUrl = ref('')

// Cargar detalles del stream al montar la página
onMounted(async () => {
  const streamId = route.params.id as string
  try {
    const details = await videoService.getStreamDetails(streamId)
    streamDetails.value = details
    videoUrl.value = await videoService.getVideoUrl(details.user_name)
  } catch (error) {
    console.error('Error al cargar los detalles del stream:', error)
  }
})
</script>

<template>
  <div v-if="streamDetails">
    <h1>{{ streamDetails.user_name }}</h1>
    <video :src="videoUrl" autoplay controls />
    <p>{{ streamDetails.title }}</p>
    <p>{{ streamDetails.viewer_count }} espectadores</p>
  </div>
  <p v-else>Cargando...</p>
</template>

<style scoped lang="scss">
video {
  width: 100%;
  height: auto;
}
</style>
