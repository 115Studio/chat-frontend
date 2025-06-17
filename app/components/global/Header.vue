<script setup lang="ts">
import { PhChatCircleSlash, PhMoonStars, PhNotePencil, PhSidebarSimple } from '@phosphor-icons/vue'
import { useSidebarStore } from '@app/store/sidebar.store'
import Button from '@app/components/global/Button.vue'

const sidebar = useSidebarStore()
</script>

<template>
  <div class="header-container">
    <div class="header-items header-items__left">
      <Button size="sq" class="header-item" @click="sidebar.toggle()">
        <PhSidebarSimple :size="20" />
      </Button>
    </div>
    <div class="header-items header-items__right">
      <RouterLink to="/">
        <Button size="sq" class="header-item" v-if="!sidebar.isOpen">
          <PhNotePencil :size="20"/>
        </Button>
      </RouterLink>
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
  margin: 12px 12px 12px 0;
}

</style>
