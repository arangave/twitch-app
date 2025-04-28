<script setup lang="ts">
import { defineProps, ref, onMounted, computed } from 'vue'
import { TwitchService } from '~/services/TwitchService'

type Stream = {
  id: string
  user_login: string
  thumbnail_url: string
  title: string
  user_name: string
  is_verified: boolean
  game_name: string
  tags: string[]
}

const props = defineProps<{ streams: Stream[]; collapsed?: boolean }>()
const isCollapsed = computed(() => props.collapsed ?? false)
const hoveredId = ref<string | null>(null)
const showAll = ref(false)
let player: any = null

const visibleStreams = computed(() => {
  const limit = showAll.value
    ? props.streams.length
    : isCollapsed.value && window.innerWidth >= 1024
      ? 4
      : 3
  return props.streams.slice(0, limit)
})

const toggleShow = () => (showAll.value = !showAll.value)

const loadPlayer = (user_login: string, id: string) => {
  hoveredId.value = id
  const embedDiv = document.getElementById(`twitch-player-${id}`)
  if (!embedDiv) return
  embedDiv.innerHTML = ''
  player = new (window as any).Twitch.Player(embedDiv.id, {
    channel: user_login,
    width: '100%',
    height: '100%',
    autoplay: true,
    muted: true,
    parent: [window.location.hostname],
  })
}

const unloadPlayer = () => {
  hoveredId.value = null
  player?.pause?.()
  player?.remove?.()
  player = null
}

onMounted(() => {
  if (!(window as any).Twitch?.Player) {
    const script = Object.assign(document.createElement('script'), {
      src: 'https://player.twitch.tv/js/embed/v1.js',
      async: true,
    })
    document.body.appendChild(script)
  }
})
</script>

<template>
  <section class="live-section">
    <h2 class="live-title">
      <span class="live-title--blue">Live channels</span> we think you’ll like
    </h2>

    <div :class="['grid-streams', { collapsed: isCollapsed }]">
      <div v-for="stream in visibleStreams" :key="stream.id" class="stream-card">
        <div
          class="stream-card__preview-wrapper"
          @mouseenter="loadPlayer(stream.user_login, stream.id)"
          @mouseleave="unloadPlayer"
        >
          <NuxtLink :to="`/stream/${stream.user_login}`">
            <img
              class="stream-card__preview"
              :src="
                stream.thumbnail_url.replace('{width}', '320').replace('{height}', '180')
              "
              :alt="stream.title"
            />
          </NuxtLink>
          <div
            v-if="hoveredId === stream.id"
            :id="`twitch-player-${stream.id}`"
            class="stream-card__iframe player-overlay"
          />
        </div>

        <div class="stream-card__info">
          <img
            class="stream-card__avatar"
            :src="stream.thumbnail_url.replace('{width}', '32').replace('{height}', '32')"
            alt="Avatar"
          />
          <div class="stream-card__details">
            <p class="stream-card__title">{{ stream.title }}</p>
            <p class="stream-card__user">
              {{ stream.user_name }}
              <img src="/iconos/verificado.png" class="verified-icon" alt="Verificado" />
            </p>
            <div class="stream-card__tags">
              <span v-for="tag in stream.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="show-more-wrapper" @click="toggleShow">
      <hr class="divider" />
      <div class="show-more">
        <span>{{ showAll ? 'Show less' : 'Show more' }}</span>
        <img src="/iconos/Vector10.png" :class="{ rotated: showAll }" alt="Toggle" />
      </div>
      <hr class="divider" />
    </div>
  </section>
</template>

<style scoped lang="scss">


.live-section { display: flex; flex-direction: column; gap: 0.625rem; }
.live-title { font-size: 1.25rem; font-weight: 500; margin-bottom: 0.5rem; color: $text-light;
  &--blue { color: $primary-color; font-weight: 600; }
}
.grid-streams {
  display: grid; gap: 2.313rem; grid-template-columns: repeat(1, 1fr);
  @media (min-width: 48rem) { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: 64rem) { grid-template-columns: repeat(3, 1fr); }
  &.collapsed { @media (min-width: 64rem) { grid-template-columns: repeat(4, 1fr); } }
}
.stream-card {
  background: $background-dark; overflow: hidden; display: flex; flex-direction: column;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  &:hover { box-shadow: 0 0 0.625rem 0.125rem $primary-color; transform: translateY(-0.125rem); }
  &__preview-wrapper { width: 100%; aspect-ratio: 16/9; background: #000; }
  &__iframe, &__preview { width: 100%; height: 100%; object-fit: cover; display: block; }
  &__info { display: flex; padding: 0.5rem 0.25rem; gap: 0.5rem; }
  &__avatar { width: 2.5rem; height: 2.5rem; border-radius: 50%; object-fit: cover; margin-top: 0.5rem; }
  &__details { flex: 1; display: flex; flex-direction: column; gap: 0.3rem; }
  &__title { font-weight: 600; font-size: 0.9rem; color: $text-light; line-height: 1.2; }
  &__user { margin-top: 0.2rem; color: $text-muted; font-size: 0.8rem; display: flex; align-items: center; gap: 0.4rem; }
  .verified-icon { width: 0.8rem; height: 0.8rem; }
  &__tags { display: flex; flex-wrap: wrap; gap: 0.4rem;
    span { background: $background-button; padding: 0.2rem 0.5rem; border-radius: 1rem; font-size: 0.75rem; color: $text-muted; }
  }
}
.show-more-wrapper { display: flex; align-items: center; gap: 1rem; margin-top: 2rem; cursor: pointer; }
.divider { flex: 1; height: 0.05rem; background: $border-light; border: none; }
.show-more { display: flex; align-items: center; gap: 0.4rem; font-size: 0.95rem; font-weight: 600; color: $primary-color; white-space: nowrap;
  img { width: 0.75rem; height: 0.75rem; transition: transform 0.3s ease; filter: brightness(0) invert(1); }
}
.rotated { transform: rotate(180deg); }
</style>
