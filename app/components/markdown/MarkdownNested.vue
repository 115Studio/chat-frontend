<script setup lang="ts">
import type { InlineToken } from '@app/lib/parse-md'

defineProps<{
  nestedToken: InlineToken
}>();
</script>

<template>
  <Text v-if="nestedToken.type === 'text'" as="span">{{ nestedToken.content }}</Text>
  <Text v-else-if="nestedToken.type === 'bold'" as="strong">{{ nestedToken.content }}</Text>
  <Text v-else-if="nestedToken.type === 'italic'" as="span" class="italic">{{ nestedToken.content }}</Text>
  <Text v-else-if="nestedToken.type === 'bold-italic'" as="strong" class="italic">{{ nestedToken.content }}</Text>
  <Text v-else-if="nestedToken.type === 'strike'" as="span" class="line-through">{{ nestedToken.content }}</Text>
  <a v-else-if="nestedToken.type === 'link'" :href="nestedToken.href" target="_blank" rel="noopener noreferrer" class="max-w-fit link">
    <Text as="span" tone="accent" variant="bodyMd">{{ nestedToken.text }}</Text>
  </a>
  <span v-else-if="nestedToken.type === 'inline-code'" class="bg-white px-1 py-0.5 rounded text-sm font-mono">
    {{ nestedToken.content }}
  </span>
</template>

<style scoped lang="scss">

</style>
