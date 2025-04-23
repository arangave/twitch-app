<script setup lang="ts">
import { defineProps, ref, onMounted, computed } from 'vue'
import { TwitchService } from '~/services/TwitchService'

// 1. Hacemos que collapsed sea opcional
const props = defineProps<{
  collapsed?: boolean
}>()

// 2. Computed que cae en false si no recibe nada
const isCollapsed = computed(() => props.collapsed ?? false)

const categories = ref<any[]>([])

// 3. Usamos isCollapsed en lugar de props.collapsed
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
  text-align: center;
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
  }

  &__viewers {
    color: #aaa;
    font-size: 0.8rem;
    margin-top: -0.2rem;
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.5rem; // Espacio por defecto
  margin: 2rem 0;
  max-width: 100%;
  margin-inline: auto;
  padding-inline: 1rem;
}

.featured-category {
  width: 240px;
  height: 50px;
  background: #1e61cc;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  font-size: 1.05rem;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease,
    width 0.3s ease;

  span {
    margin-left: 0.1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  img {
    width: 65px;
    height: 65px;
    object-fit: contain;
  }

  &:hover {
    background: #1d3b77;
    transform: translateY(-2px);
  }

  // SOLO cuando el sidebar está abierto Y estamos en pantallas grandes
  @media (min-width: 1024px) {
    .featured-categories.sidebar-open & {
      width: 200px; // ligeramente más pequeñas para que quepan las 5
    }
  }

  // Ajustes móviles
  @media (max-width: 768px) {
    font-size: 0.95rem;

    span {
      white-space: normal;
      text-overflow: unset;
      overflow: visible;
    }

    img {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
