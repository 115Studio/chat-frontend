<script setup lang="ts">
import type { InlineToken } from '@app/lib/parse-md'

defineProps<{
  inlineToken: InlineToken
}>();
</script>

<template>
  <Text v-if="inlineToken.type === 'text'" as="span">{{ inlineToken.content }}</Text>
  <Text v-else-if="inlineToken.type === 'bold'" as="strong">
    <template v-if="inlineToken.inline">
      <template v-for="(nestedToken, k) in inlineToken.inline" :key="k">
        <MarkdownInline :inline-token="nestedToken" />
      </template>
    </template>
    <template v-else>
      {{ inlineToken.content }}
    </template>
  </Text>
  <Text v-else-if="inlineToken.type === 'italic'" as="span" class="italic">
    <template v-if="inlineToken.inline">
      <template v-for="(nestedToken, k) in inlineToken.inline" :key="k">
        <MarkdownInline :inline-token="nestedToken" />
      </template>
    </template>
    <template v-else>
      {{ inlineToken.content }}
    </template>
  </Text>
  <Text v-else-if="inlineToken.type === 'bold-italic'" as="strong" class="italic">
    <template v-if="inlineToken.inline">
      <template v-for="(nestedToken, k) in inlineToken.inline" :key="k">
        <MarkdownInline :inline-token="nestedToken" />
      </template>
    </template>
    <template v-else>
      {{ inlineToken.content }}
    </template>
  </Text>
  <Text v-else-if="inlineToken.type === 'strike'" as="span" class="line-through">
    <template v-if="inlineToken.inline">
      <template v-for="(nestedToken, k) in inlineToken.inline" :key="k">
        <MarkdownInline :inline-token="nestedToken" />
      </template>
    </template>
    <template v-else>
      {{ inlineToken.content }}
    </template>
  </Text>
  <a v-else-if="inlineToken.type === 'link'" :href="inlineToken.href" target="_blank" rel="noopener noreferrer" class="max-w-fit link">
    <Text as="span" tone="accent" variant="bodyMd">{{ inlineToken.text }}</Text>
  </a>
  <span v-else-if="inlineToken.type === 'inline-code'" class="bg-white px-1 py-0.5 rounded text-sm font-mono">
    {{ inlineToken.content }}
  </span>
</template>

<style scoped lang="scss">
.link {
  @apply hover:opacity-70 transition-opacity duration-200;
}
</style>
