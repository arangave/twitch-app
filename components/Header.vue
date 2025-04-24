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
      <img :src="`/iconos/logo_twitch.png`" alt="Midutch logo" class="header__logo" />
      <NuxtLink to="/" class="header__title">MIDUTCH</NuxtLink>
    </div>

    <!-- ✅ Buscar visible también en móviles -->
    <div class="header__search">
      <input type="text" placeholder="Search" />
      <button class="header__search-icon" type="button">
        <img :src="`/iconos/search.png`" alt="Search" class="header__icon" />
      </button>
    </div>

    <div class="header__right">
      <!-- ✅ Mostrar solo en móvil -->
      <img
        :src="`/iconos/more.png`"
        alt="More"
        class="header__icon header__more"
        @click="toggleMobileMenu"
      />

      <!-- ✅ Iconos solo escritorio -->
      <template v-if="!isMobileMenuOpen">
        <div class="header__notification-wrapper">
          <img
            :src="`/iconos/notification.png`"
            alt="Notifications"
            class="header__icon header__notification"
          />
          <span v-if="notificationCount > 0" class="notification-badge">
            {{ notificationCount }}
          </span>
        </div>
        <button class="header__login">Log in</button>
        <button class="header__signup">Sign up</button>
        <img
          :src="`/iconos/profile.png`"
          alt="Profile"
          class="header__icon header__profile"
        />
      </template>
    </div>
  </header>

  <!-- ✅ Menú desplegable móvil -->
  <div v-if="isMobileMenuOpen" class="mobile-menu">
    <div class="mobile-menu__actions">
      <div class="header__notification-wrapper">
        <img
          :src="`/iconos/notification.png`"
          alt="Notifications"
          class="header__icon header__notification"
        />
        <span v-if="notificationCount > 0" class="notification-badge">
          {{ notificationCount }}
        </span>
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
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #18181b;
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid #18181b;
  flex-wrap: wrap;

  &__left,
  &__right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &__logo {
    height: 1.5rem;
  }

  &__title {
    font-weight: bold;
    color: #fff;
    font-size: 1.1rem;
    text-decoration: none;
  }

  &__search {
    display: flex;
    align-items: center;
    background: #27272a;
    border-radius: 0.25rem;
    overflow: hidden;
    width: 20rem;
    transition: width 0.3s ease;

    input {
      background: transparent;
      border: none;
      padding: 0.5rem 0.5rem 0.5rem 0.75rem;
      color: #fff;
      flex: 1;
      outline: none;
      min-width: 0;
    }

    .header__search-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      padding: 0 0.75rem;
      cursor: pointer;

      img {
        width: 1rem;
        height: 1rem;
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

  &__more {
    display: none;
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

@media (max-width: 768px) {
  .header {
    flex-wrap: wrap;
    gap: 1rem;

    &__right > :not(.header__more) {
      display: none;
    }

    &__more {
      display: block;
    }

    &__search {
      width: 9rem;
      margin-top: 0.5rem;
    }
  }

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

    .header__login,
    .header__signup {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
