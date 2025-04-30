<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue'
import { TwitchService } from '~/services/TwitchService'
import { formatNumber } from '~/composables/useFormat'

const props = defineProps<{ collapsed?: boolean }>()
const emit = defineEmits<{ (e: 'toggle'): void }>()
const channels = ref<any[]>([])
const twitchService = new TwitchService()

onMounted(async () => {
  try {
    channels.value = await twitchService.getStreams(10)
  } catch (e) {
    console.error('Error al cargar canales en vivo:', e)
  }
})
</script>

<template>
  <aside :class="['sidebar', { collapsed: props.collapsed }]">
    <div class="sidebar__header">
      <h2 v-if="!props.collapsed" class="sidebar__title">RECOMMENDED CHANNELS</h2>
      <img
        src="/iconos/collapse.png"
        alt="Colapsar sidebar"
        class="sidebar__collapse"
        :class="{ rotated: props.collapsed }"
        @click="emit('toggle')"
      />
    </div>

    <ul class="sidebar__list">
      <li v-for="channel in channels" :key="channel.id">
        <NuxtLink :to="`/stream/${channel.user_login}`" class="sidebar__item">
          <img
            :src="
              channel.thumbnail_url.replace('{width}', '32').replace('{height}', '32')
            "
            :alt="channel.user_name"
            class="sidebar__avatar"
          />

          <div v-if="!props.collapsed" class="sidebar__info">
            <p class="sidebar__name">
              <span>{{ channel.user_name }}</span>
              <img
                v-if="channel.is_verified"
                src="/iconos/verificado.png"
                alt="Verificado"
                class="verified-icon"
              />
            </p>
            <p class="sidebar__category">{{ channel.game_name }}</p>
          </div>

          <div v-if="!props.collapsed" class="sidebar__viewers">
            <span class="sidebar__live-dot" />
            <span>{{ formatNumber(channel.viewer_count) }}</span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  width: 18rem; min-width: 16rem; background: $background-dark; padding: 1rem; color: $text-light;
  border-right: 0.0625rem solid $background-dark; display: flex; flex-direction: column; overflow-y: auto;
  font-family: 'Rubik', sans-serif; transition: width 0.3s; position: sticky; top: 4.5rem; z-index: 10;
  &.collapsed { width: 4.9rem; min-width: 4.9rem; .sidebar__title, .sidebar__info, .sidebar__viewers { display: none; }
    .sidebar__item { justify-content: flex-start; padding: 0.3rem 0.4rem; }
  }
  &__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-top: 1rem; }
  &__title { font-size: 0.85rem; font-weight: 600; color: $text-muted; margin: 0; }
  &__collapse { width: 1.2rem; height: 1.2rem; cursor: pointer; opacity: 0.7; filter: brightness(0) invert(1); &:hover {
    width:1.5rem;}
    transition: filter 0.2s; margin-left: 1rem; &.rotated { transform: rotate(180deg); transition: transform 0.3s; }
  }
  &__list { list-style: none; padding: 0; margin: 0; }
  &__item { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1rem;
    padding: 0.3rem 0.4rem; width: 100%; border-radius: 0.25rem; cursor: pointer; transition: background 0.2s; 
    text-decoration: none; color: inherit; &:hover { background: $primary-color; }
  }
  &__avatar { width: 2rem; height: 2rem; border-radius: 50%; object-fit: cover; }
  &__info { flex: 1; display: flex; flex-direction: column; overflow: hidden; p { margin: 0; line-height: 1.1; }
    .sidebar__name { margin-bottom: 0.3rem; }
  }
  &__name { font-weight: 600; font-size: 0.8125rem; color: $text-light; display: flex; align-items: center; gap: 0.5rem; }
  &__category { font-size: 0.75rem; font-weight: 400; color: $text-muted; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  &__viewers { font-size: 0.75rem; font-weight: 500; color: $text-light; display: flex; align-items: center; gap: 0.25rem; white-space: nowrap; }
  &__live-dot { width: 0.5rem; height: 0.5rem; border-radius: 50%; background: $danger-color; border: 0.125rem solid $background-dark; }
}

.verified-icon { width: 0.85rem; height: 0.85rem; margin-left: 0.2rem; vertical-align: middle; }

</style>
