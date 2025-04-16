<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { VideoService } from '~/services/VideoService'

const route = useRoute()
const videoUrl = ref('')
const videoDetails = ref<any>(null)
const videoService = new VideoService()

onMounted(async () => {
  const streamId = route.params.id
  videoDetails.value = await videoService.getStreamDetails(streamId)
  videoUrl.value = await videoService.getVideoUrl(videoDetails.value.user_name)
})
</script>

<template>
  <div class="video-page">
    <Header />
    <div class="video-container">
      <iframe
        :src="videoUrl"
        width="100%"
        height="600px"
        frameborder="0"
        allow="autoplay; encrypted-media"
      />

      <div v-if="videoDetails">
        <h2>{{ videoDetails.title }}</h2>
        <p>Stream by {{ videoDetails.user_name }}</p>
        <p>{{ videoDetails.viewer_count }} viewers</p>
      </div>
    </div>
    <Sidebar />
  </div>
</template>

<style scoped>
.video-page {
  display: flex;
  flex-direction: column;
}

.video-container {
  flex: 1;
  padding: 2rem;
}

iframe {
  margin-bottom: 1rem;
}
</style>
