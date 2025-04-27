<script setup lang="ts">
import { defineProps, ref, onMounted, computed } from 'vue'
import { TwitchService } from '~/services/TwitchService'

const props = defineProps<{
  collapsed?: boolean
}>()

const isCollapsed = computed(() => props.collapsed ?? false)

const categories = ref<any[]>([])

const visibleCategories = computed(() =>
  categories.value.slice(0, isCollapsed.value ? 8 : 6),
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
  <section class="categories-wrapper">
    <div class="categories-section">
      <h2 class="categories-title">
        <span class="categories-title--blue">Categories</span> we think you’ll like
      </h2>
      <div :class="['grid-categories', { collapsed: isCollapsed }]">
        <div
          v-for="category in visibleCategories"
          :key="category.id"
          class="category-card"
        >
          <img
            :src="category.box_art_url"
            :alt="category.name"
            class="category-card__image"
          />
          <div class="category-card__info">
            <p class="category-card__name">{{ category.name }}</p>
            <p class="category-card__viewers">
              {{ formatViewers(category.viewer_count) }}
            </p>
            <p class="category-card__tag">{{ category.tag }}</p>
          </div>
        </div>
      </div>
    </div>

    <section :class="['featured-categories', { 'sidebar-open': !isCollapsed }]">
      <div v-for="(category, index) in featured" :key="index" class="featured-category">
        <span>{{ category.name }}</span>
        <img :src="category.icon" :alt="category.name" />
      </div>
    </section>
  </section>
</template>
<style scoped lang="scss">
.categories-wrapper {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  overflow: hidden;
}

.categories-section {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.categories-title {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #fff;
  &--blue {
    color: #1e61cc;
    font-weight: 600;
  }
}

.grid-categories {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 48rem) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 64rem) {
    grid-template-columns: repeat(6, 1fr);
  }

  &.collapsed {
    @media (min-width: 64rem) {
      grid-template-columns: repeat(8, 1fr);
    }
  }
}

.category-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: #0e0e10;
  border-radius: 0.5rem;
  overflow: hidden;
  transition:
    box-shadow 0.3s,
    transform 0.3s;

  &:hover {
    box-shadow: 0 0 0.625rem 0.125rem #1e61cc;
    transform: translateY(-0.125rem);
  }

  &__image {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-bottom: 0.0625rem solid #0e0e10;
  }

  &__info {
    padding: 0.5rem;
  }

  &__name {
    font-weight: 600;
    font-size: 0.9rem;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0.4rem;
  }

  &__viewers {
    color: #aaa;
    font-size: 0.8rem;
    margin-top: 0;
  }

  &__tag {
    color: #eee;
    font-size: 0.75rem;
    background: #2c2c2c;
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
    margin-top: 0.5rem;
    display: inline-block;
    text-align: center;
  }
}

.featured-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
  gap: 1.5rem;
  margin: 1rem 0;
  width: 100%;
  padding: 0;
  justify-content: center;

  &.sidebar-open {
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    gap: 1rem;
    justify-content: center;
  }

  @media (max-width: 768px) {
    grid-template-columns: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
}

.featured-category {
  width: 100%;
  max-width: 16rem;
  height: 3.3125rem;
  background: #1e61cc;
  border-radius: 0.375rem;
  color: white;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.8rem;
  font-size: 1.2rem;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  img {
    width: 4rem;
    height: 4rem;
    object-fit: contain;
  }

  &:hover {
    background: #1d3b77;
    transform: translateY(-2px);
  }

  @include respond('mobile') {
    font-size: 1rem;
    max-width: 14rem;
    height: 2.4rem;
    padding: 0 0.6rem;
    align-items: center;

    img {
      width: 3.2rem;
      height: 3.2rem;
    }
  }
}
</style>
