<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TwitchService } from '~/services/TwitchService'

const notificationCount = ref(0)
const twitchService = new TwitchService()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

onMounted(async () => {
  try {
    const streams = await twitchService.getStreams()
    notificationCount.value = streams.length
  } catch (error) {
    console.error('Error al cargar notificaciones:', error)
  }
})
</script>

<template>
  <header class="header">
    <div class="header__left">
      <img src="/iconos/logo_twitch.png" alt="Midutch logo" class="header__logo" />
      <NuxtLink to="/" class="header__title">MIDUTCH</NuxtLink>
    </div>

    <!-- Buscador solo visible en desktop -->
    <div class="header__search-wrapper desktop-search">
      <input type="text" placeholder="Search" class="header__search-input" />
      <button class="header__search-icon" type="button">
        <img src="/iconos/search.png" alt="Search" />
      </button>
    </div>

    <div class="header__right">
      <div class="header__menu-icons">
        <div class="header__notification-wrapper">
          <img src="/notification.png" alt="Notifications" class="header__icon" />
          <span v-if="notificationCount > 0" class="notification-badge">{{
            notificationCount
          }}</span>
        </div>
        <button class="header__login">Log in</button>
        <button class="header__signup">Sign up</button>
        <img src="/profile.png" alt="Profile" class="header__icon header__profile" />
      </div>

      <!-- Botón hamburguesa -->
      <button
        class="hamburger"
        :class="{ active: isMobileMenuOpen }"
        @click="toggleMobileMenu"
      >
        <span /><span /><span />
      </button>
    </div>
  </header>

  <!-- Menú móvil desplegable -->
  <div v-if="isMobileMenuOpen" class="mobile-menu">
    <div class="mobile-menu__actions">
      <!-- Buscador dentro del menú hamburguesa -->
      <div class="header__search-wrapper mobile-search">
        <input type="text" placeholder="Search" class="header__search-input" />
        <button class="header__search-icon" type="button">
          <img src="/iconos/search.png" alt="Search" />
        </button>
      </div>

      <div class="header__notification-wrapper">
        <img src="/notification.png" alt="Notifications" class="header__icon" />
        <span v-if="notificationCount > 0" class="notification-badge">{{
          notificationCount
        }}</span>
      </div>

      <button class="header__login">Log in</button>
      <button class="header__signup">Sign up</button>

      <img src="/profile.png" alt="Profile" class="header__icon header__profile" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #18181b;
  padding: 0.313rem;
  border-bottom: 1px solid #18181b;
  flex-wrap: nowrap;

  &__left,
  &__right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-right: 1.7rem;
  }

  &__logo {
    margin-left: 1rem;

    height: 2rem;
  }

  &__title {
    font-weight: bold;
    color: #fff;
    font-size: 0.813rem;
    text-decoration: none;
  }

  .header__search-wrapper {
    flex-grow: 1;
    max-width: 26rem;
    min-width: 10rem;
    display: flex;
    align-items: center;
    margin: 0 1rem;

    .header__search-input {
      flex: 1;
      background: #1c1c1f;
      border: 1px solid #5e5e60;
      border-radius: 0.5rem 0 0 0.5rem;
      padding: 0 1rem;
      color: #fff;
      font-size: 0.875rem;
      height: 2.4rem;
      outline: none;
    }

    .header__search-icon {
      width: 2.125rem;
      height: 2.5rem;
      background: #2d2d30;
      border: none;
      padding: 0 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0 0.5rem 0.5rem 0;

      img {
        width: 1.4rem;
        height: 1.4rem;
        filter: brightness(0) invert(1);
      }
    }
  }

  &__icon {
    width: 1.25rem;
    height: 1.25rem;
    filter: brightness(0) invert(1);
    opacity: 0.8;
    cursor: pointer;
  }

  &__profile {
    border-radius: 50%;
  }

  &__login,
  &__signup {
    background: none;
    border: 1px solid #1e61cc;
    color: #fff;
    padding: 0.4rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;

    &:hover {
      background: #1e61cc;
    }
  }

  &__signup {
    background: #1e61cc;
  }

  &__notification-wrapper {
    position: relative;
  }

  &__menu-icons {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
}

.notification-badge {
  position: absolute;
  top: -0.375rem;
  right: -0.375rem;
  background: #e91916;
  color: #fff;
  font-size: 0.5rem;
  font-weight: bold;
  padding: 0.1rem 0.3rem;
  border-radius: 9999px;
}

/* BOTÓN HAMBURGUESA */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
  width: 1.7rem;
  height: 1.5rem;
  background: none;
  border: none;

  cursor: pointer;
  z-index: 100;

  span {
    display: block;
    height: 2px;
    width: 100%;
    border-radius: 4rem;
    background-color: white;
    transition: all 0.3s ease;
  }

  &.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  &.active span:nth-child(2) {
    opacity: 0;
  }

  &.active span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }
}

/* MENÚ DESPLEGABLE */
.mobile-menu {
  background: #18181b;
  padding: 1rem;
  border-top: 1px solid #2c2c2c;
}

.mobile-menu__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .header {
    gap: 0.5rem;
    flex-wrap: nowrap;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .header__menu-icons {
    display: none;
  }

  .desktop-search {
    display: none !important;
  }

  .hamburger {
    display: flex;
    flex-shrink: 0;
  }

  .header__left {
    flex-shrink: 0;
  }

  .mobile-search {
    display: flex;
    width: 100%;
    max-width: 20rem;
    margin-bottom: 1rem;
    align-items: center;

    .header__search-input {
      flex: 1;
      background: #1c1c1f;
      border: 1px solid #5e5e60;
      border-radius: 0.5rem 0 0 0.5rem;
      padding: 0 1rem;
      color: #fff;
      font-size: 0.875rem;
      height: 2.4rem;
      outline: none;
    }

    .header__search-icon {
      width: 2.125rem;
      height: 2.5rem;
      background: #2d2d30;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0 0.5rem 0.5rem 0;
      padding: 0;

      img {
        width: 1.4rem;
        height: 1.4rem;
        filter: brightness(0) invert(1);
      }
    }
  }
}
</style>
