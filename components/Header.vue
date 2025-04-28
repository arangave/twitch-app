<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TwitchService } from '~/services/TwitchService'

const notificationCount = ref(0)
const isMobileMenuOpen = ref(false)
const twitchService = new TwitchService()

const toggleMobileMenu = () => (isMobileMenuOpen.value = !isMobileMenuOpen.value)

onMounted(async () => {
  try {
    notificationCount.value = (await twitchService.getStreams()).length
  } catch (e) {
    console.error('Error al cargar notificaciones:', e)
  }
})
</script>

<template>
  <header class="header">
    <div class="header__left">
      <img :src="`/iconos/logo_twitch.png`" alt="Midutch logo" class="header__logo" />
      <NuxtLink to="/" class="header__title">MIDUTCH</NuxtLink>
    </div>

    <div class="header__search-wrapper desktop-search">
      <input type="text" placeholder="Search" class="header__search-input" />
      <button class="header__search-icon" type="button">
        <img :src="`/iconos/search.png`" alt="Search" />
      </button>
    </div>

    <div class="header__right">
      <div class="header__menu-icons">
        <div class="header__notification-wrapper">
          <img
            :src="`/iconos/notification.png`"
            alt="Notifications"
            class="header__icon"
          />
          <span v-if="notificationCount > 0" class="notification-badge">{{
            notificationCount
          }}</span>
        </div>
        <button class="header__login">Log in</button>
        <button class="header__signup">Sign up</button>
        <img
          :src="`/iconos/profile.png`"
          alt="Profile"
          class="header__icon header__profile"
        />
      </div>

      <button
        class="hamburger"
        :class="{ active: isMobileMenuOpen }"
        @click="toggleMobileMenu"
      >
        <span /><span /><span />
      </button>
    </div>
  </header>

  <div v-if="isMobileMenuOpen" class="mobile-menu">
    <div class="mobile-menu__actions">
      <div class="header__search-wrapper mobile-search">
        <input type="text" placeholder="Search" class="header__search-input" />
        <button class="header__search-icon" type="button">
          <img :src="`/iconos/search.png`" alt="Search" />
        </button>
      </div>

      <div class="header__notification-wrapper">
        <img :src="`/iconos/notification.png`" alt="Notifications" class="header__icon" />
        <span v-if="notificationCount > 0" class="notification-badge">{{
          notificationCount
        }}</span>
      </div>

      <button class="header__login">Log in</button>
      <button class="header__signup">Sign up</button>
      <img
        :src="`/iconos/profile.png`"
        alt="Profile"
        class="header__icon header__profile"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
@use '~/assets/styles/_variables' as *;

.header { width: 100%; @include flex-center; justify-content: space-between; @include header-background; padding: 0.35rem; flex-wrap: nowrap;
  &__left, &__right, &__menu-icons { @include flex-center; gap: 0.9rem; }
  &__right { gap: 0.7rem; margin-right: 0.5rem; }
  &__logo { margin-left: 0.75rem; height: 2rem; }
  &__title { font-weight: bold; color: $text-light; font-size: 0.8rem; text-decoration: none; }
  &__icon, &__profile { width: 1.2rem; height: 1.2rem; filter: brightness(0) invert(1); opacity: 0.8; cursor: pointer; border-radius: 50%; }
  &__notification-wrapper { position: relative; }
  .header__search-wrapper { @include flex-center; flex-grow: 1; max-width: 26rem; min-width: 10rem; margin: 0 1rem;
    .header__search-input, .header__search-icon {
      height: 2.5rem; border: none; font-size: 0.875rem;
    }
    .header__search-input { flex: 1; background: $background-input; border: 0.0625rem solid $secondary-color; border-radius: 0.5rem 0 0 0.5rem; padding: 0 1rem; color: $text-light; outline: none; }
    .header__search-icon { width: 2.2rem; background: $background-button; @include flex-center; border-radius: 0 0.5rem 0.5rem 0;
      img { width: 1.4rem; height: 1.4rem; filter: brightness(0) invert(1); }
    }
  }
  &__login, &__signup { @include button-style($primary-color, $text-light); font-size: 0.8rem; padding: 0.4rem 0.8rem; border-radius: 0.375rem; }
  &__login { background-color: $background-button; border: none; &:hover { background: $primary-color; } }
}
.notification-badge { position: absolute; top: -0.3rem; right: -0.3rem; background: $danger-color; color: $text-light; font-size: 0.55rem; font-weight: bold; padding: 0.1rem 0.3rem; border-radius: 25%; }
.hamburger { display: none; flex-direction: column; justify-content: center; gap: 0.25rem; width: 1.3rem; height: 1.5rem; background: none; border: none; cursor: pointer; z-index: 100; margin-left: 0.75rem;
  span { display: block; height: 0.125rem; width: 100%; border-radius: 4rem; background-color: $text-light; transition: all 0.3s ease; }
  &.active span:nth-child(1) { transform: rotate(45deg) translate(0.25rem, 0.25rem); }
  &.active span:nth-child(2) { opacity: 0; }
  &.active span:nth-child(3) { transform: rotate(-45deg) translate(0.25rem, -0.25rem); }
}
.mobile-menu { background: $background-dark; padding: 1rem; border-top: 0.0625rem solid $secondary-color;
  &__actions { @include flex-center; flex-direction: column; gap: 1rem; }
}
.mobile-search { @include flex-center; width: 100%; max-width: 20rem; margin-bottom: 1rem;
  .header__search-input, .header__search-icon {
    height: 2.5rem; border: none; font-size: 0.875rem;
  }
  .header__search-input { flex: 1; background: $background-input; border: 0.0625rem solid $secondary-color; border-radius: 0.5rem 0 0 0.5rem; padding: 0 1rem; color: $text-light; outline: none; }
  .header__search-icon { width: 2.2rem; background: $background-button; @include flex-center; border-radius: 0 0.5rem 0.5rem 0;
    img { width: 1.4rem; height: 1.4rem; filter: brightness(0) invert(1); }
  }
}
@media (max-width: 48rem) {
  .header { gap: 0.6rem; flex-wrap: nowrap; flex-direction: row; justify-content: space-between;
    .header__menu-icons, .desktop-search { display: none !important; }
    .hamburger { display: flex; flex-shrink: 0; }
    .header__left { flex-shrink: 0; }
  }
}
</style>
