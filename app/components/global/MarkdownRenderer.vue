<template>
  <div>
    <template v-for="(token, index) in tokens" :key="index">
      <Text v-if="token.type === 'heading'" :as="`h${token.strength}`" :variant="resolveHeadingVariant(token.strength)">
        {{ token.content }}
      </Text>
      <Text v-if="token.type === 'text'" as="p" variant="bodyMd">
        <template v-if="token.inline">
          <MarkdownInlineList :tokens="token.inline" />
        </template>
        <template v-else>
          {{ token.content }}
        </template>
      </Text>
      <a v-if="token.type === 'link'" :href="token.href" target="_blank" rel="noopener noreferrer" class="max-w-fit link">
        <Text as="span" tone="accent" variant="bodyMd">
          {{ token.text }}
        </Text>
      </a>
      <img v-if="token.type === 'image'" :src="token.src" :alt="token.alt" class="image no-drag-no-select" >
      <Text v-else-if="token.type === 'bold'" as="strong" class="">
        <template v-if="token.inline">
          <MarkdownInlineList :tokens="token.inline" />
        </template>
        <template v-else>
          {{ token.content }}
        </template>
      </Text>
      <Text v-else-if="token.type === 'italic'" as="p" class="italic">
        <template v-if="token.inline">
          <MarkdownInlineList :tokens="token.inline" />
        </template>
        <template v-else>
          {{ token.content }}
        </template>
      </Text>
      <Text v-else-if="token.type === 'bold-italic'" as="strong" class="italic">
        <template v-if="token.inline">
          <MarkdownInlineList :tokens="token.inline" />
        </template>
        <template v-else>
          {{ token.content }}
        </template>
      </Text>
      <Text v-else-if="token.type === 'strike'" as="p" class="line-through">
        <template v-if="token.inline">
          <MarkdownInlineList :tokens="token.inline" />
        </template>
        <template v-else>
          {{ token.content }}
        </template>
      </Text>
      <hr v-else-if="token.type === 'hr'" class="my-4" >
      <div v-if="token.type === 'code'" class="code-block-container relative group">
        <div class="code-block-header">
          <Text v-if="token.language" as="p" class="font-mono text-sm">
            {{ token.language }}
          </Text>
          <CopyButton :value="token.content" />
        </div>
        <highlightjs :code="token.content" :language="token.language || 'plaintext'" class="rounded-b-md"/>
      </div>
      <ol
        v-else-if="token.type === 'list'"
        style="padding-left: 1em; list-style: decimal"
        class="list-decimal list-inside"
      >
        <li v-for="(item, i) in token.items" :key="i" :value="item.number">
          <MarkdownInlineList :tokens="item.text" />
          <br>
        </li>
      </ol>
      <ul
        v-else-if="token.type === 'ulist'"
        style="padding-left: 1em; list-style: disc"
        class="list-disc list-inside marker:text-xs"
      >
        <li v-for="(item, i) in token.items" :key="i">
          <MarkdownInlineList :tokens="item.text" />
          <ul
            v-if="item.subItems && item.subItems.length > 0"
            style="padding-left: 1em; list-style: circle"
            class="list-disc list-inside marker:text-xs mt-1"
          >
            <li v-for="(subItem, k) in item.subItems" :key="k">
              <MarkdownInlineList :tokens="subItem.text" />
            </li>
          </ul>
        </li>
      </ul>
      <br v-else-if="token.type === 'break'" >
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Token } from '@app/lib/parse-md';
import { parseMarkdown } from '@app/lib/parse-md'
import MarkdownInlineList from '@app/components/markdown/MarkdownInlineList.vue'


const props = defineProps<{ markdown: string }>()

const tokens: Ref<Token[]> = computed(() => parseMarkdown(props.markdown))

const resolveHeadingVariant = (strength: number) => {
  switch (strength) {
    case 1:
      return 'headingLg'
    case 2:
      return 'headingMd'
    case 3:
      return 'headingSm'
    case 4:
      return 'bodyLg'
    default:
      return 'bodyMd'
  }
}
</script>

<style scoped lang="scss">
.image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
  @apply max-w-96;
}

.link {
  @apply hover:opacity-70 transition-opacity duration-200;
}

.code-block-container {
  @apply relative rounded-2xl;
  overflow: hidden;
  background: white;
  border: 1px solid var(--color-border-default);
}

.code-block-header {
  @apply flex justify-between items-center px-4 py-2 bg-white border-b border-neutral-200;
  min-height: 44px;
}
</style>
