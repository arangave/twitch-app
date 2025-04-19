<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { VideoService } from '~/services/VideoService'
import DefaultLayout from '~/layouts/DefaultLayout.vue'

const route = useRoute()
const streamId = route.params.id // Este es el nombre del usuario
const videoDetails = ref<any>(null) // Ref para los detalles del stream
const videoService = new VideoService()

onMounted(async () => {
  console.log('Verificando Stream ID:', streamId) // Depuración

  try {
    // Llama a la API usando el nombre del usuario (como 'ZeratoR')
    const details = await videoService.getStreamDetails(streamId) // Obtener detalles del stream

    if (details) {
      videoDetails.value = details
      console.log('Detalles del stream:', details) // Depuración
    } else {
      console.error('No se encontraron detalles para este video')
    }
  } catch (error) {
    console.error('Error al obtener los detalles del video:', error)
  }
})
</script>

<template>
  <DefaultLayout>
    <!-- Mostrar el video solo si los detalles están disponibles -->
    <div v-if="videoDetails" class="stream-page">
      <div class="video-section">
        <iframe
          v-if="videoDetails"
          :src="`https://player.twitch.tv/?channel=${videoDetails.user_name}&autoplay=true&parent=localhost`"
          frameborder="0"
          allowfullscreen
          width="100%"
          height="500px"
        />
      </div>

      <!-- Información del stream -->
      <div class="stream-info">
        <h1>{{ videoDetails.title }}</h1>
        <p><strong>Streamer:</strong> {{ videoDetails.user_name }}</p>
        <p><strong>Game:</strong> {{ videoDetails.game_name }}</p>
        <p><strong>Viewers:</strong> {{ videoDetails.viewer_count }} viewers</p>
        <p>
          <strong>Description:</strong>
          {{ videoDetails.description || 'No description available' }}
        </p>
      </div>

      <!-- Chat en vivo -->
      <div class="chat-section">
        <iframe
          v-if="videoDetails"
          :src="`https://www.twitch.tv/embed/${videoDetails.user_name}/chat?parent=localhost`"
          frameborder="0"
          scrolling="yes"
          width="100%"
          height="500px"
        />
      </div>
    </div>

    <!-- Mensaje de carga -->
    <div v-else>
      <p>Cargando video...</p>
    </div>
  </DefaultLayout>
</template>

<style scoped>
.stream-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
}

.video-section {
  background-color: #000;
  border-radius: 0.5rem;
}

.stream-info {
  color: #fff;
  font-size: 1.2rem;
}

.chat-section {
  background-color: #18181b;
  border-radius: 0.5rem;
  padding: 1rem;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
}

p {
  margin-top: 1rem;
}

iframe {
  border-radius: 0.5rem;
}
</style>
