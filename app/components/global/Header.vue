<script setup lang="ts">
import { PhChatCircleSlash, PhMoonStars, PhSidebarSimple } from '@phosphor-icons/vue'
</script>

<template>
  <div class="header-container">
    <div class="header-items header-items__left">
      <div class="header-item">
        <PhSidebarSimple :size="20" weight="bold" />
      </div>
    </div>
    <div class="header-items header-items__right">
      <div class="header-item">
        <PhMoonStars :size="20" weight="bold" />
      </div>
      <div class="header-item">
        <PhChatCircleSlash :size="20" weight="bold" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-container {
  display: flex;
  position: absolute;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.header-items {
  display: flex;
  flex-direction: row;
  align-items: center;

  &__right {
    margin-right: 0;
  }

  &__left {
    margin-left: 0;
  }
}

.header-item {
  background: var(--color-default);
  border: 1px solid var(--color-border-default);
  padding: 16px;
  border-radius: 14px;
  margin: 12px 12px 12px 0;
}

</style>
