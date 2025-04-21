<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { VideoService } from '~/services/VideoService'
import DefaultLayout from '~/layouts/DefaultLayout.vue'
import {
  Heart,
  Star,
  MoreVertical,
  Clock3,
  User,
  Youtube,
  Instagram,
  Twitter,
  ArrowUpRightFromSquare,
  Music2 as TiktokIcon,
} from 'lucide-vue-next'

const route = useRoute()
const streamId = route.params.id
const videoDetails = ref<any>(null)
const videoService = new VideoService()
const isFollowing = ref(false)
const isSubscribed = ref(false)
const toggleFollow = () => {
  isFollowing.value = !isFollowing.value
}
const toggleSubscribe = () => {
  isSubscribed.value = !isSubscribed.value
}
onMounted(async () => {
  const details = await videoService.getStreamDetails(streamId as string)
  if (details && details.user_login) {
    videoDetails.value = details
  } else {
    console.error('No se encontraron detalles del video')
  }
})
</script>
<template>
  <DefaultLayout>
    <div v-if="videoDetails && videoDetails.user_login" class="stream-page">
      <div class="stream-layout">
        <div class="main-content">
          <div class="video-section">
            <iframe
            :src="`https://player.twitch.tv/?channel=${videoDetails.user_login}&autoplay=true&parent=apptwitch.netlify.app`"
            frameborder="0"
            allowfullscreen
            width="100%"
            height="100%"
          />

          </div>
          <div class="stream-header">
            <div class="avatar-wrapper">
              <img
                :src="videoDetails.profile_image_url"
                class="avatar"
                alt="Streamer avatar"
              />
              <span class="live-tag">VIVIR</span>
            </div>
            <div class="stream-meta">
              <h1 class="stream-name">{{ videoDetails.user_name }}</h1>
              <p class="stream-title">{{ videoDetails.title }}</p>
              <div class="stream-tags">
                <span class="category">{{ videoDetails.game_name }}</span>
                <template v-if="videoDetails.tags?.length">
                  <span v-for="tag in videoDetails.tags" :key="tag" class="tag">{{
                    tag
                  }}</span>
                </template>
              </div>
            </div>
            <div class="stream-actions">
              <div class="buttons">
                <button class="btn follow" @click="toggleFollow">
                  <Heart
                    :fill="isFollowing ? 'white' : 'none'"
                    color="white"
                    :stroke-width="2"
                    size="16"
                  />
                  {{ isFollowing ? 'Siguiendo' : 'Seguir' }}
                </button>
                <button class="btn subscribe" @click="toggleSubscribe">
                  <Star
                    :fill="isSubscribed ? '#facc15' : 'none'"
                    :color="isSubscribed ? '#facc15' : 'white'"
                    :stroke-width="2"
                    size="16"
                  />
                  {{ isSubscribed ? 'Suscrito' : 'Suscribirse' }}
                </button>
              </div>
              <div class="icons">
                <span class="icon red-icon">
                  <User size="16" /> {{ videoDetails.viewer_count ?? 0 }}
                </span>
                <span class="icon"> <Clock3 size="16" /> 3:23:05 </span>
                <span class="icon"><ArrowUpRightFromSquare size="16" /></span>
                <span class="icon"><MoreVertical size="16" /></span>
              </div>
            </div>
          </div>
          <h2 class="about-heading">Acerca de {{ videoDetails.user_name }}</h2>
          <div class="about">
            <p class="followers">
              {{
                videoDetails.followers > 0
                  ? videoDetails.followers.toLocaleString()
                  : 'Seguidores no disponibles'
              }}
              <span v-if="videoDetails.followers > 0">seguidores</span>
            </p>
            <p class="description">
              {{ videoDetails.description || 'Sin descripción disponible.' }}
            </p>
            <hr class="about-divider" />
            <div class="socials">
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                class="icon"
                ><Youtube size="18"
              /></a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                class="icon"
                ><Instagram size="18"
              /></a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                class="icon"
                ><Twitter size="18"
              /></a>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                class="icon"
                ><TiktokIcon size="18"
              /></a>
            </div>
          </div>
        </div>
        <div class="chat-section">
          <iframe
          :src="`https://www.twitch.tv/embed/${videoDetails.user_login}/chat?darkpopout&parent=apptwitch.netlify.app`"
          frameborder="0"
          scrolling="yes"
          width="100%"
          height="100%"
        />

        </div>
      </div>
    </div>
    <div v-else>
      <p style="color: white">Cargando video...</p>
    </div>
  </DefaultLayout>
</template>
<style scoped>
.stream-page { background: #0e0e10; color: #fff; padding: 2rem; }
.stream-layout { display: flex; flex-direction: column; gap: 1rem; }
@media (min-width: 64em) { .stream-layout { flex-direction: row; } }
.main-content { flex: 3; display: flex; flex-direction: column; gap: 1.5rem; }
.video-section { height: 28rem; background: #000; border-radius: .5rem; overflow: hidden; }
.stream-header { display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-start; }
.avatar-wrapper { position: relative; width: 3.125rem; height: 3.125rem; flex-shrink: 0; }
.avatar { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; background: #333; }
.live-tag { position: absolute; bottom: -0.375rem; left: 50%; transform: translateX(-50%); background: #5a0d0d; padding: .2rem .6rem; border-radius: .375rem; font-size: .65rem; font-weight: bold; color: white; z-index: 1; }
.stream-meta { flex: 1; display: flex; flex-direction: column; gap: .1rem; }
.stream-name { font-size: 1.2rem; font-weight: bold; }
.stream-title { font-size: .95rem; color: #ccc; }
.stream-tags { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: .4rem; }
.category { font-weight: bold; color: #1e61cc; }
.tag { background: #1f1f23; padding: .3rem .75rem;  font-size: .75rem; color: #e5e5e5; }
.stream-actions { display: flex; flex-direction: column; gap: .5rem; align-items: flex-end; min-width: 12rem; }
.buttons { display: flex; gap: .5rem; flex-wrap: wrap; }
.btn { padding: .4rem 1rem; border-radius: .375rem; font-weight: bold; border: none; cursor: pointer; font-size: .9rem; display: flex; align-items: center; gap: .4rem; }
.follow { background: #1e61cc; color: white; }
.subscribe { background: #2d2d2d; color: white; }
.icons { display: flex; flex-wrap: wrap; gap: .7rem; font-size: .85rem; align-items: center; }
.icon { display: flex; align-items: center; gap: .3rem; color: #ccc; }
.red-icon { color: #5a0d0d; font-weight: bold; }
.about-heading { font-size: 1.1rem; font-weight: bold; margin: 1rem 0 .01rem; color: white; }
.about { background: #1e1e1e; padding: 1.5rem; border-radius: .625rem; }
.about-divider { border: none; border-top: 1px solid #ffffff33; margin: 1rem 0; }
.followers { font-weight: bold; font-size: .95rem; }
.followers span { color: #aaa; font-weight: normal; margin-left: .3rem; }
.description { font-size: .9rem; color: #ccc; margin: .8rem 0; }
.socials { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1rem; }
.socials .icon { cursor: pointer; color: #ccc; transition: .2s ease; }
.socials .icon:hover { color: white; }

.chat-section {
  flex: 1.2; min-height: 25rem; background: #18181b; border-radius: .5rem;
  overflow: hidden; display: flex; flex-direction: column; width: 100%;
}
.chat-section iframe {
  flex: 1; width: 100%; height: 100%; border: none;
}

@media (max-width: 64em) {
  .stream-layout { flex-direction: column; }
  .chat-section { height: auto; margin-top: 1rem; }
  .stream-header { flex-direction: column; align-items: flex-start; }
  .stream-actions { align-items: flex-start; width: 100%; }
  .about-heading { margin-top: 2rem; }
}
@media (max-width: 37.5em) {
  .stream-tags { flex-direction: column; align-items: flex-start; }
  .chat-section { min-height: 25rem; }
}
</style>
