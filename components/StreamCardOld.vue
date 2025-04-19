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
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: #18181b;
  border: 0.0625rem solid #2c2c2c;

  &__thumbnail {
    width: 100%;
    height: 11.25rem;
    object-fit: cover;
    display: block;
    background-color: #18181b;
  }

  &__info {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  &__title {
    font-weight: 600;
    font-size: 1.1rem;
    color: #ffffff;
  }

  &__game,
  &__viewers {
    font-size: 0.875rem;
    color: #adadb8;
  }
}
</style>
