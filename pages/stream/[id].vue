<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { VideoService } from '~/services/VideoService'
import {
  Heart,
  Star,
  MoreVertical,
  Clock3,
  User,
  ArrowUpRightFromSquare,
  Youtube,
  Instagram,
  Twitter,
  Music2 as TiktokIcon,
} from 'lucide-vue-next'

const route = useRoute()
const videoDetails = ref<any>(null)
const domain = ref('')

// Carga datos y dominio en onMounted (sólo en cliente)
onMounted(async () => {
  domain.value = window.location.hostname
  const details = await new VideoService().getStreamDetails(route.params.id as string)
  if (details?.user_login) {
    videoDetails.value = details
  } else {
    console.error('No se encontraron detalles del stream')
  }
})

// Estado de follow/subscription
const isFollowing = ref(false)
const isSubscribed = ref(false)
const toggleFollow = () => {
  isFollowing.value = !isFollowing.value
}
const toggleSubscribe = () => {
  isSubscribed.value = !isSubscribed.value
}
</script>

<template>
  <div v-if="videoDetails" class="stream-page">
    <div class="stream-layout">
      <!-- CONTENIDO PRINCIPAL -->
      <div class="main-content">
        <!-- 1. Vídeo -->
        <div class="video-section">
          <iframe
            :src="`https://player.twitch.tv/?channel=${videoDetails.user_login}&autoplay=true&parent=${domain}`"
            frameborder="0"
            allowfullscreen
            width="100%"
            height="100%"
          />
        </div>

        <!-- 2. Cabecera del stream -->
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
            <h1 class="stream-name">
              {{ videoDetails.user_name }}
              <img
                v-if="videoDetails.is_verified"
                src="/iconos/verificado.png"
                class="verified-icon"
                alt="Verificado"
              />
            </h1>

            <p class="stream-title">{{ videoDetails.title }}</p>
            <div class="stream-tags">
              <span class="category">{{ videoDetails.game_name }}</span>
              <span v-for="tag in videoDetails.tags" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>
          </div>

          <div class="stream-actions">
            <div class="buttons">
              <button class="btn follow" @click="toggleFollow">
                <Heart
                  :fill="isFollowing ? 'white' : 'none'"
                  color="white"
                  stroke-width="2"
                  :size="16"
                />
                {{ isFollowing ? 'Siguiendo' : 'Seguir' }}
              </button>
              <button class="btn subscribe" @click="toggleSubscribe">
                <Star
                  :fill="isSubscribed ? '#facc15' : 'none'"
                  :color="isSubscribed ? '#facc15' : 'white'"
                  stroke-width="2"
                  :size="16"
                />
                {{ isSubscribed ? 'Suscrito' : 'Suscribirse' }}
              </button>
            </div>
            <div class="icons">
              <span class="icon red-icon">
                <User :size="16" /> {{ videoDetails.viewer_count }}
              </span>
              <span class="icon"><Clock3 :size="16" /> 3:23:05</span>
              <span class="icon"><ArrowUpRightFromSquare :size="16" /></span>
              <span class="icon"><MoreVertical :size="16" /></span>
            </div>
          </div>
        </div>

        <!-- 3. Sección “Acerca de” -->
        <h2 class="about-heading">Acerca de {{ videoDetails.user_name }}</h2>
        <div class="about">
          <p class="followers">
            {{ videoDetails.followers.toLocaleString() }}
            <span v-if="videoDetails.followers > 0">seguidores</span>
          </p>
          <p class="description">
            {{ videoDetails.description || 'Sin descripción disponible.' }}
          </p>
          <hr class="about-divider" />
          <div class="socials">
            <a href="#" class="icon"><Youtube :size="18" /></a>
            <a href="#" class="icon"><Instagram :size="18" /></a>
            <a href="#" class="icon"><Twitter :size="18" /></a>
            <a href="#" class="icon"><TiktokIcon s:ize="18" /></a>
          </div>
        </div>
      </div>

      <!-- 4. Chat (a la derecha en pantallas grandes) -->
      <div class="chat-section">
        <iframe
          :src="`https://www.twitch.tv/embed/${videoDetails.user_login}/chat?darkpopout&parent=${domain}`"
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
</template>

<style scoped lang="scss">
.stream-page {
  background: #0e0e10;
  color: #fff;
  padding: 2rem;
}

.stream-layout {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* En pantallas ≥ 64em (1024px) mostramos en fila */
@media (min-width: 64em) {
  .stream-layout {
    flex-direction: row;
  }
}

.main-content {
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.video-section {
  background: #000;
  border-radius: 0.5rem;
  overflow: hidden;
  height: 28rem;
}

.stream-header {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-start;
}

.avatar-wrapper {
  position: relative;
  width: 3.125rem;
  height: 3.125rem;
  flex-shrink: 0;
}
.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background: #333;
}
.live-tag {
  position: absolute;
  bottom: -0.375rem;
  left: 50%;
  transform: translateX(-50%);
  background: #e91916;
  padding: 0.2rem 0.6rem;
  border-radius: 0.375rem;
  font-size: 0.65rem;
  font-weight: bold;
  color: white;
  z-index: 1;
}

.stream-meta {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
.stream-name {
  font-size: 1.2rem;
  font-weight: bold;
}
.stream-title {
  font-size: 0.95rem;
  color: #ccc;
}
.stream-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.4rem;
}
.category {
  color: #1e61cc;
}
.tag {
  background: #1f1f23;
  padding: 0.3rem 0.75rem;
  font-size: 0.75rem;
  color: #e5e5e5;
}

.stream-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
  min-width: 12rem;
}
.buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.btn {
  padding: 0.4rem 1rem;
  border-radius: 0.375rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.follow {
  background: #1e61cc;
  color: white;
}
.subscribe {
  background: #2d2d2d;
  color: white;
}
.icons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  font-size: 0.85rem;
  align-items: center;
}
.icon {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #ccc;
}
.red-icon {
  color: #e91916;
  font-weight: bold;
}

.about-heading {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 1rem 0 0.5rem;
}
.about {
  background: #1e1e1e;
  padding: 1.5rem;
  border-radius: 0.625rem;
}
.about-divider {
  border: none;
  border-top: 1px solid #ffffff33;
  margin: 1rem 0;
}
.followers {
  font-weight: bold;
  font-size: 0.95rem;
}
.description {
  font-size: 0.9rem;
  color: #ccc;
  margin: 0.8rem 0;
}
.socials {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}
.socials .icon {
  cursor: pointer;
  color: #ccc;
  transition: 0.2s ease;
}
.socials .icon:hover {
  color: white;
}

.chat-section {
  flex: 1.2;
  min-height: 25rem;
  background: #18181b;
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
}
/* El iframe ocupa todo el contenedor */
.chat-section iframe {
  flex: 1;
  width: 100%;
  height: 100%;
  border: none;
}

@media (max-width: 64em) {
  .chat-section {
    margin-top: 1rem;
  }
}
.verified-icon {
  width: 1rem;
  height: 1rem;
  margin-left: 0.4rem;
  vertical-align: middle;
}
</style>
