<template>
  <header class="header">
    <div class="header__left">
      <img src="/iconos/logo_twitch.png" alt="Midutch logo" class="header__logo" />
      <span class="header__title">MIDUTCH</span>
      <img src="/iconos/more.png" alt="More" class="header__icon header__more" />
    </div>
    <div class="header__search">
      <input type="text" placeholder="Search" />
      <button class="header__search-icon">
        <img src="/iconos/search.png" alt="Search" class="header__icon" />
      </button>
    </div>
    <div class="header__right">
      <img
        src="/iconos/notification.png"
        alt="Notifications"
        class="header__icon header__notification"
      />
      <button class="header__login">Log in</button>
      <button class="header__signup">Sign up</button>
      <img src="/iconos/profile.png" alt="Profile" class="header__icon header__profile" />
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #18181b;
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid #2c2c2c;
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

  &__notification {
    width: 20px;
    height: 20px;
    opacity: 0.8;
    transition: filter 0.2s ease-in-out;
    &:hover {
      filter: brightness(0) saturate(100%) sepia(100%) hue-rotate(25deg) brightness(1.2);
    }
  }
}
</style>
