<template>
  <header class="header">
    <div class="header__left">
      <img :src="`/iconos/logo_twitch.png`" alt="Midutch logo" class="header__logo" />
      <NuxtLink to="/" class="header__title">MIDUTCH</NuxtLink>
      <img :src="`/iconos/more.png`" alt="More" class="header__icon header__more" />
    </div>

    <div class="header__search">
      <input type="text" placeholder="Search" />
      <button class="header__search-icon" type="button">
        <img :src="`/iconos/search.png`" alt="Search" class="header__icon" />
      </button>
    </div>

    <div class="header__right">
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
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TwitchService } from '~/services/TwitchService'

const notificationCount = ref(0)
const twitchService = new TwitchService()

onMounted(async () => {
  try {
    const streams = await twitchService.getStreams()
    notificationCount.value = streams.length
  } catch (error) {
    console.error('Error al cargar notificaciones:', error)
  }
})
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #18181b;
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid #18181b;

  &__left,
  &__right {
    display: flex;
    align-items: center;
  }

  &__left {
    gap: 0.5rem;
  }

  &__right {
    gap: 0.75rem;
  }

  &__logo {
    height: 24px;
  }

  &__title {
    font-weight: bold;
    color: #fff;
    font-size: 1.1rem;
    text-decoration: none;
    cursor: pointer;
  }

  &__more {
    width: 16px;
    height: 16px;
    margin-left: 6px;
    opacity: 0.7;
  }

  &__search {
    display: flex;
    align-items: center;
    background: #27272a;
    border-radius: 4px;
    overflow: hidden;
    width: 300px;

    input {
      background: transparent;
      border: none;
      padding: 0.5rem;
      color: #fff;
      flex: 1;
      outline: none;
    }

    .header__search-icon {
      background: none;
      border: none;
      padding: 0 0.75rem;
      cursor: pointer;
    }
  }

  &__icon {
    width: 20px;
    height: 20px;
    filter: brightness(0) invert(1);
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
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #1e61cc;
    }
  }

  &__signup {
    background-color: #1e61cc;
    border-color: #1e61cc;
  }

  &__notification-wrapper {
    position: relative;
    display: inline-block;
  }

  &__notification {
    width: 20px;
    height: 20px;
    opacity: 0.8;
    transition: filter 0.2s ease-in-out;
  }
}

.notification-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: #e91916;
  color: white;
  font-size: 0.5rem; // más pequeño
  font-weight: bold;
  padding: 0.1rem 0.3rem; // menos relleno
  border-radius: 9999px;
  line-height: 1;
}
</style>
