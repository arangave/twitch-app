<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue'
import { TwitchService } from '~/services/TwitchService'

function formatViewers(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`
  return count.toString()
}

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
      <h2 v-if="!props.collapsed" class="sidebar__title">Canales en directo</h2>
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
              {{ channel.user_name }}
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
            <span>{{ formatViewers(channel.viewer_count) }}</span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  width: 15rem;
  min-width: 15rem;
  background: #0e0e10;
  padding: 1rem;
  color: #fff;
  border-right: 0.0625rem solid #0e0e10;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  font-family: 'Rubik', sans-serif;
  transition: width 0.3s;

  &.collapsed {
    width: 2.7rem;
    min-width: 2.7rem;

    .sidebar__title,
    .sidebar__info,
    .sidebar__viewers {
      display: none;
    }

    .sidebar__item {
      justify-content: flex-start;
      padding: 0.3rem 0.4rem;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 1.25rem 0.75rem;
  }

  &__title {
    font-size: 0.85rem;
    font-weight: 600;
    color: #dedee3;
    margin: 0;
  }

  &__collapse {
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
    opacity: 0.7;
    filter: brightness(0) invert(1);
    transition: filter 0.2s;

    &.rotated {
      transform: rotate(180deg);
      transition: transform 0.3s;
    }
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.2rem;
    padding: 0.3rem 0.4rem;
    width: 100%;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background 0.2s;
    text-decoration: none;
    color: inherit;

    &:hover {
      background: #1e61cc;
    }
  }

  &__avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    object-fit: cover;
  }

  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    p {
      margin: 0;
      line-height: 1.1;
    }
  }

  &__name,
  &__category {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__name {
    font-weight: 600;
    font-size: 0.8125rem;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  &__category {
    font-size: 0.75rem;
    font-weight: 400;
    color: #adadb8;
  }

  &__viewers {
    font-size: 0.75rem;
    font-weight: 500;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    white-space: nowrap;
  }

  &__live-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: #e91916;
    border: 0.125rem solid #0e0e10;
  }
}

.verified-icon {
  width: 0.85rem;
  height: 0.85rem;
  margin-left: 0.2rem;
  vertical-align: middle;
}
</style>
