<script setup lang="ts">
import type { InlineToken } from '@app/lib/parse-md'

defineProps<{
  inlineToken: InlineToken
}>();
</script>

<template>
  <Text v-if="inlineToken.type === 'text'" as="span">{{ inlineToken.content }}</Text>
  <Text v-else-if="inlineToken.type === 'bold'" as="strong">{{ inlineToken.content }}</Text>
  <Text v-else-if="inlineToken.type === 'italic'" as="span" class="italic">{{ inlineToken.content }}</Text>
  <Text v-else-if="inlineToken.type === 'bold-italic'" as="strong" class="italic">{{ inlineToken.content }}</Text>
  <Text v-else-if="inlineToken.type === 'strike'" as="span" class="line-through">{{ inlineToken.content }}</Text>
  <a v-else-if="inlineToken.type === 'link'" :href="inlineToken.href" target="_blank" rel="noopener noreferrer" class="max-w-fit link">
    <Text as="span" tone="accent" variant="bodyMd">{{ inlineToken.text }}</Text>
  </a>
  <span v-else-if="inlineToken.type === 'inline-code'" class="bg-white px-1 py-0.5 rounded text-sm font-mono">
            {{ inlineToken.content }}
  </span>
</template>

<style scoped lang="scss">

</style>
