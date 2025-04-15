<script setup lang="ts">
const { stream } = defineProps<{ stream: any }>()

const thumbnail = computed(() =>
  stream.thumbnail_url.replace('{width}', '320').replace('{height}', '180'),
)
</script>

<template>
  <article class="stream-card">
    <img class="stream-card__thumbnail" :src="thumbnail" :alt="stream.user_name" />
    <div class="stream-card__info">
      <h2 class="stream-card__title">{{ stream.user_name }}</h2>
      <p class="stream-card__game">{{ stream.game_name }}</p>
      <p class="stream-card__viewers">{{ stream.viewer_count }} espectadores</p>
    </div>
  </article>
</template>

<style scoped lang="scss">
.stream-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  &__thumbnail {
    width: 100%;
    height: auto;
  }
  &__info {
    padding: 1rem;
  }
  &__title {
    font-weight: bold;
    font-size: 1.2rem;
  }
}
</style>
