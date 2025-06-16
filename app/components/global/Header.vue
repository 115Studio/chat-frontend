<script setup lang="ts">
import { PhChatCircleSlash, PhMoonStars, PhSidebarSimple } from '@phosphor-icons/vue'
import { useSidebarStore } from '@app/store/sidebar.store'

const sidebar = useSidebarStore()
</script>

<template>
  <div class="header-container">
    <div class="header-items header-items__left">
      <div class="header-item" @click="sidebar.toggle()">
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
  padding: 16px;
  border-radius: 14px;
  margin: 12px 12px 12px 0;

  background: var(--color-btn-inner-bg);
  border: 1px solid var(--color-btn-inner-border);
  cursor: pointer;

  &:hover {
    background-color: var(--color-btn-inner-hover-bg);
    border: 1px solid var(--color-btn-inner-hover-border);
  }

  &:active, &:focus-visible {
    background-color: var(--color-btn-inner-selected-bg);
    border: 1px solid var(--color-btn-inner-selected-border);
  }
}

</style>
