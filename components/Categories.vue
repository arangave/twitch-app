<script setup lang="ts">
import { defineProps, ref, onMounted, computed } from 'vue'
import { TwitchService } from '~/services/TwitchService'

const props = defineProps<{ collapsed: boolean }>()
const categories = ref([])

const visibleCategories = computed(() =>
  categories.value.slice(0, props.collapsed ? 8 : 6),
)
const formatViewers = (count: number) =>
  count >= 1000 ? `${Math.floor(count / 1000)}K viewers` : `${count} viewers`

onMounted(async () => {
  categories.value = await new TwitchService().getTopCategoriesWithViewers()
})

const featured = [
  { name: 'Games', icon: '/iconos/gaming-e9019587744b56b11b431.png' },
  { name: 'IRL', icon: '/iconos/irl-baa32e8e64a6974282c0.png' },
  { name: 'Music & DJs', icon: '/iconos/music-5fb4595a30d04d991e24.png' },
  { name: 'Creative', icon: '/iconos/creative-6423fb5fbcf31fadee38.png' },
  { name: 'Sports', icon: '/iconos/esports-7a078acca57531d11e29.png' },
]
</script>

<template>
  <section class="categories-section">
    <h2 class="categories-title">
      <span class="categories-title--blue">Categories</span> we think you’ll like
    </h2>
    <div :class="['grid-categories', { collapsed: props.collapsed }]">
      <div v-for="category in visibleCategories" :key="category.id" class="category-card">
        <img
          :src="category.box_art_url"
          :alt="category.name"
          class="category-card__image"
        />
        <div class="category-card__info">
          <p class="category-card__name">{{ category.name }}</p>
          <p class="category-card__viewers">{{ formatViewers(category.viewer_count) }}</p>
          <p class="category-card__tag">{{ category.tag }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="featured-categories">
    <div v-for="(category, index) in featured" :key="index" class="featured-category">
      <span>{{ category.name }}</span>
      <img :src="category.icon" :alt="category.name" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.categories-section { margin-top: 2rem; display: flex; flex-direction: column; gap: 1rem; }
.categories-title { font-size: 1.25rem; font-weight: 500; margin-bottom: .5rem; color: #fff;
  &--blue { color: #1e61cc; font-weight: 600; }
}
.grid-categories {
  display: grid; gap: 1.5rem; grid-template-columns: repeat(2, 1fr);
  @media (min-width: 48rem) { grid-template-columns: repeat(3, 1fr); }
  @media (min-width: 64rem) { grid-template-columns: repeat(6, 1fr); }
  &.collapsed { @media (min-width: 64rem) { grid-template-columns: repeat(8, 1fr); } }
}
.category-card {
  display: flex; flex-direction: column; gap: .5rem; background: #0e0e10; border-radius: .5rem;
  overflow: hidden; text-align: center; transition: box-shadow .3s, transform .3s;
  &:hover { box-shadow: 0 0 .625rem .125rem #1e61cc; transform: translateY(-.125rem); }
  &__image { width: 100%; height: auto; object-fit: cover; border-bottom: .0625rem solid #0e0e10; }
  &__info { padding: .5rem; }
  &__name { font-weight: 600; font-size: .9rem; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  &__viewers { color: #aaa; font-size: .8rem; margin-top: -.2rem; }
  &__tag { color: #eee; font-size: .75rem; background: #2c2c2c; padding: .25rem .5rem; border-radius: 1rem; margin-top: .5rem; display: inline-block; text-align: center; }
}
.featured-categories {
  display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; margin-top: 2rem;
  .featured-category {
    background: #1e61cc; padding: .75rem 1rem; border-radius: .65rem; color: white; font-weight: 600;
    display: flex; align-items: center; justify-content: flex-start; width: 10rem; height: 1rem; font-size: .85rem;
    position: relative; text-align: left; transition: background-color .3s, transform .2s;
    span { flex: 1; margin-left: .5rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    img { width: 4rem; height: 3rem; object-fit: contain; position: absolute; right: -1rem; }
    &:hover { background: #1d3b77; transform: translateY(-.125rem); }
  }
}
</style>
