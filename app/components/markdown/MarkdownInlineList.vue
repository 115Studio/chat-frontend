<script setup lang="ts">
import type { InlineToken } from '@app/lib/parse-md'
import MarkdownInline from './MarkdownInline.vue'

defineProps<{
  tokens: InlineToken[]
}>();
</script>

<template>
  <template v-for="(inlineToken, index) in tokens" :key="index">
    <MarkdownInline :inline-token="inlineToken" />
  </template>
</template> 