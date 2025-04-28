<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { formatNumber } from '~/composables/useFormat'
import { TwitchService } from '~/services/TwitchService'
import { Heart, Star, MoreVertical, Clock3, User, ArrowUpRightFromSquare, Youtube, Instagram, Twitter, Music2 as TiktokIcon } from 'lucide-vue-next'

const route = useRoute(),
  videoDetails = ref<any>(null),
  domain = ref(''),
  isFollowing = ref(false),
  isSubscribed = ref(false)

const toggleFollow = () => (isFollowing.value = !isFollowing.value)
const toggleSubscribe = () => (isSubscribed.value = !isSubscribed.value)

onMounted(async () => {
  domain.value = window.location.hostname
  const details = await new TwitchService().getStreamDetails(route.params.id as string)
  videoDetails.value = details?.user_login ? details : null
})
</script>

<template>
  <div v-if="videoDetails" class="stream-page">
    <div class="stream-layout">
      <div class="main-content">
        <div class="video-section">
          <iframe :src="`https://player.twitch.tv/?channel=${videoDetails.user_login}&autoplay=true&parent=${domain}`" frameborder="0" allowfullscreen width="100%" height="100%" />
        </div>
        <div class="stream-header">
          <div class="avatar-wrapper">
            <img :src="videoDetails.profile_image_url" class="avatar" alt="Streamer avatar" />
            <span class="live-tag">LIVE</span>
          </div>
          <div class="stream-meta">
            <h1 class="stream-name">{{ videoDetails.user_name }}<img v-if="videoDetails.is_verified" src="/iconos/verificado.png" class="verified-icon" alt="Verificado" /></h1>
            <p class="stream-title">{{ videoDetails.title }}</p>
            <div class="stream-tags">
              <span class="category">{{ videoDetails.game_name }}</span>
              <span v-for="tag in videoDetails.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
          <div class="stream-actions">
            <div class="buttons">
              <button class="btn follow" @click="toggleFollow">
                <Heart :fill="isFollowing ? 'white' : 'none'" color="white" stroke-width="2" :size="16" />
                {{ isFollowing ? 'Siguiendo' : 'Seguir' }}
              </button>
              <button class="btn subscribe" @click="toggleSubscribe">
                <Star :fill="isSubscribed ? '#facc15' : 'none'" :color="isSubscribed ? '#facc15' : 'white'" stroke-width="2" :size="16" />
                {{ isSubscribed ? 'Suscrito' : 'Suscribirse' }}
              </button>
            </div>
            <div class="icons">
              <span class="icon red-icon"><User :size="16" /> {{ formatNumber(videoDetails.viewer_count) }}</span>
              <span class="icon"><Clock3 :size="16" /> 3:23:05</span>
              <span class="icon"><ArrowUpRightFromSquare :size="16" /></span>
              <span class="icon"><MoreVertical :size="16" /></span>
            </div>
          </div>
        </div>
        <h2 class="about-heading">Acerca de {{ videoDetails.user_name }}</h2>
        <div class="about">
          <p class="followers">{{ formatNumber(videoDetails.followers) }} <span>followers</span></p>
          <p class="description">{{ videoDetails.description || 'Sin descripción disponible.' }}</p>
          <hr class="about-divider" />
          <div class="socials">
            <a href="#" class="icon"><Youtube :size="18" /></a>
            <a href="#" class="icon"><Instagram :size="18" /></a>
            <a href="#" class="icon"><Twitter :size="18" /></a>
            <a href="#" class="icon"><TiktokIcon :size="18" /></a>
          </div>
        </div>
      </div>
      <div class="chat-section">
        <iframe :src="`https://www.twitch.tv/embed/${videoDetails.user_login}/chat?darkpopout&parent=${domain}`" frameborder="0" scrolling="yes" width="100%" height="100%" />
      </div>
    </div>
  </div>
  <div v-else><p style="color: white">Cargando video...</p></div>
</template>


<style scoped lang="scss">
.stream-page { background: $background-dark; color: $text-light; margin: 0; padding: 0; width: 100%; box-sizing: border-box; min-height: 100vh; }
.stream-layout { display: flex; flex-direction: row; gap: 0.5rem; width: 100%; max-width: 120rem; margin: 0 auto; padding: 0;
  @media (max-width: 48rem) { flex-direction: column; align-items: center; gap: 1rem; }
}
.main-content { flex: 3; display: flex; flex-direction: column; gap: 1.5rem; margin: 0; padding: 0; width: 100%; }
.video-section { background: #000; border-radius: 0.5rem; overflow: hidden; height: 28rem; width: 100%;
  @media (max-width: 48rem) { height: auto; aspect-ratio: 16/9; }
}
.stream-header { display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-start; width: 100%;
  @media (max-width: 48rem) { flex-direction: column; align-items: center; text-align: center; }
}
.avatar-wrapper { position: relative; width: 3.125rem; height: 3.125rem; flex-shrink: 0; }
.avatar { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; background: #333; }
.live-tag { position: absolute; bottom: -0.375rem; left: 50%; transform: translateX(-50%); background: $danger-color; padding: 0.2rem 0.6rem; border-radius: 0.375rem; font-size: $font-smaller; font-weight: bold; color: $text-light; }
.stream-meta { flex: 1; display: flex; flex-direction: column; gap: 0.1rem;
  @media (max-width: 48rem) { align-items: center; }
}
.stream-name { font-size: $font-large; font-weight: bold; }
.stream-title { font-size: $font-small; color: $text-muted; }
.stream-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.4rem;
  @media (max-width: 48rem) { justify-content: center; }
}
.category { color: $primary-color; }
.tag { background: $background-light; padding: 0.2rem 0.5rem; border-radius: 1rem; font-size: $font-smaller; color: $text-light; }
.stream-actions { display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-end; min-width: 12rem;
  @media (max-width: 48rem) { align-items: center; width: 100%; }
}
.buttons { display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center; }
.btn, .follow { @include button-style($primary-color, $text-light); }
.subscribe { @include button-style($background-light, $text-light); }
.icons { display: flex; flex-wrap: wrap; gap: 0.7rem; font-size: 0.85rem; align-items: center;
  @media (max-width: 48rem) { justify-content: center; }
}
.icon { display: flex; align-items: center; gap: 0.3rem; color: $text-muted; }
.red-icon { color: $danger-color; font-weight: bold; }
.about-heading { font-size: 1.1rem; font-weight: bold; margin: 1rem 0 0.5rem;
  @media (max-width: 48rem) { text-align: center; }
}
.about { background: $background-light; padding: 1.5rem; border-radius: 0.625rem; width: 100%; }
.about-divider { border: none; border-top: 1px solid rgba(255, 255, 255, 0.2); margin: 1rem 0; }
.followers, .description { font-weight: bold; font-size: 0.95rem;
  @media (max-width: 48rem) { text-align: center; }
}
.description { font-size: $font-small; color: $text-muted; margin: 0.8rem 0; text-align: left;
  @media (max-width: 48rem) { text-align: center; }
}
.socials { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1rem; justify-content: flex-start;
  @media (max-width: 48rem) { justify-content: center; }
}
.socials .icon { cursor: pointer; color: $text-muted; transition: 0.2s ease;
  &:hover { color: $text-light; }
}
.chat-section { flex: 1.2; min-width: 20rem; max-width: 25rem; background: $background-dark; border-radius: 0.5rem;
  overflow: hidden; display: flex; flex-direction: column; width: 100%; min-height: 25rem;
  @media (max-width: 48rem) { min-width: 100%; max-width: 100%; min-height: 35rem; }
}
.chat-section iframe { flex: 1; width: 100%; height: 100%; border: none; }
.verified-icon { width: 1rem; height: 1rem; margin-left: 0.4rem; vertical-align: middle; }
</style>

