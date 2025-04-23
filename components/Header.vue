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

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #18181b;
  padding: 0.75rem 1.5rem;
  border-bottom: 0.0625rem solid #18181b;

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
    height: 1.5rem;
  }
  &__title {
    font-weight: bold;
    color: #fff;
    font-size: 1.1rem;
    text-decoration: none;
    cursor: pointer;
  }
  &__more {
    width: 1rem;
    height: 1rem;
    margin-left: 0.375rem;
    opacity: 0.7;
  }
  &__search {
    display: flex;
    align-items: center;
    background: #27272a;
    border-radius: 0.25rem;
    overflow: hidden;
    width: 18.75rem;

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
  &__icon,
  &__notification {
    width: 1.25rem;
    height: 1.25rem;
    filter: brightness(0) invert(1);
    cursor: pointer;
    opacity: 0.8;
    transition: filter 0.2s;
  }
  &__profile {
    border-radius: 50%;
  }

  &__login,
  &__signup {
    background: none;
    border: 0.0625rem solid #1e61cc;
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
    border-color: #1e61cc;
  }

  &__notification-wrapper {
    position: relative;
    display: inline-block;
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
  line-height: 1;
}
</style>
