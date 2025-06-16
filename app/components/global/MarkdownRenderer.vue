<template>
  <div>
    <template v-for="(token, index) in tokens" :key="index">
      <Text v-if="token.type === 'heading'" :as="`h${token.strength}`" :variant="resolveHeadingVariant(token.strength)">
        {{ token.content }}
      </Text>
      <Text v-if="token.type === 'text'" as="p" variant="bodyMd">
        <template v-if="token.inline">
          <template v-for="(inlineToken, j) in token.inline" :key="j">
            <MarkdownInline :inline-token="inlineToken" />
          </template>
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
          <template v-for="(inlineToken, j) in token.inline" :key="j">
            <MarkdownInline :inline-token="inlineToken" />
          </template>
        </template>
        <template v-else>
          {{ token.content }}
        </template>
      </Text>
      <Text v-else-if="token.type === 'italic'" as="p" class="italic">
        <template v-if="token.inline">
          <template v-for="(inlineToken, j) in token.inline" :key="j">
            <MarkdownInline :inline-token="inlineToken" />
          </template>
        </template>
        <template v-else>
          {{ token.content }}
        </template>
      </Text>
      <Text v-else-if="token.type === 'bold-italic'" as="strong" class="italic">
        <template v-if="token.inline">
          <template v-for="(inlineToken, j) in token.inline" :key="j">
            <MarkdownInline :inline-token="inlineToken" />
          </template>
        </template>
        <template v-else>
          {{ token.content }}
        </template>
      </Text>
      <Text v-else-if="token.type === 'strike'" as="p" class="line-through">
        <template v-if="token.inline">
          <template v-for="(inlineToken, j) in token.inline" :key="j">
            <MarkdownInline :inline-token="inlineToken" />
          </template>
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
          <button
            :class="{ 'copied': copiedStates[index] }"
            type="button"
            @click="copyCode(token.content, index)"
          >
            <transition
              name="fade"
              mode="out-in">
              <div v-if="!copiedStates[index]" class="bg-neutral-100 hover:bg-neutral-200 transition-all rounded-lg p-1.5 active:scale-90">
                <PhCopy size="16" weight="bold" class="text-slate-800" />
              </div>
              <div v-else class="bg-emerald-200 transition-all rounded-lg p-1.5 active:scale-90">
                <PhCheck size="16" weight="bold" class="text-emerald-600" />
              </div>
            </transition>
          </button>
        </div>
        <highlightjs :code="token.content" :language="token.language || 'plaintext'" class="rounded-b-md"/>
      </div>
      <ol
        v-else-if="token.type === 'list'"
        style="padding-left: 1em; list-style: decimal"
        class="list-decimal list-inside"
      >
        <li v-for="(item, i) in token.items" :key="i">
          {{ item }} <br>
        </li>
      </ol>
      <ul
        v-else-if="token.type === 'ulist'"
        style="padding-left: 1em; list-style: disc"
        class="list-disc list-inside marker:text-xs"
      >
        <li v-for="(item, i) in token.items" :key="i">
          <template v-for="(inlineToken, j) in item.text" :key="j">
            <Text v-if="inlineToken.type === 'text'" as="span">{{ inlineToken.content }}</Text>
            <Text v-else-if="inlineToken.type === 'bold'" as="strong">
              <template v-if="inlineToken.inline">
                <template v-for="(nestedToken, k) in inlineToken.inline" :key="k">
                  <MarkdownNested :nested-token="nestedToken" />
                </template>
              </template>
              <template v-else>
                {{ inlineToken.content }}
              </template>
            </Text>
            <Text v-else-if="inlineToken.type === 'italic'" as="span" class="italic">
              <template v-if="inlineToken.inline">
                <template v-for="(nestedToken, k) in inlineToken.inline" :key="k">
                  <MarkdownNested :nested-token="nestedToken" />
                </template>
              </template>
              <template v-else>
                {{ inlineToken.content }}
              </template>
            </Text>
            <Text v-else-if="inlineToken.type === 'bold-italic'" as="strong" class="italic">
              <template v-if="inlineToken.inline">
                <template v-for="(nestedToken, k) in inlineToken.inline" :key="k">
                  <MarkdownNested :nested-token="nestedToken" />
                </template>
              </template>
              <template v-else>
                {{ inlineToken.content }}
              </template>
            </Text>
            <Text v-else-if="inlineToken.type === 'strike'" as="span" class="line-through">
              <template v-if="inlineToken.inline">
                <template v-for="(nestedToken, k) in inlineToken.inline" :key="k">
                  <MarkdownNested :nested-token="nestedToken" />
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
          <ul
            v-if="item.subItems && item.subItems.length > 0"
            style="padding-left: 1em; list-style: circle"
            class="list-disc list-inside marker:text-xs mt-1"
          >
            <li v-for="(subItem, k) in item.subItems" :key="k">
              <template v-for="(inlineToken, l) in subItem.text" :key="l">
                <Text v-if="inlineToken.type === 'text'" as="span">{{ inlineToken.content }}</Text>
                <Text v-else-if="inlineToken.type === 'bold'" as="strong">
                  <template v-if="inlineToken.inline">
                    <template v-for="(nestedToken, m) in inlineToken.inline" :key="m">
                      <MarkdownNested :nested-token="nestedToken" />
                    </template>
                  </template>
                  <template v-else>
                    {{ inlineToken.content }}
                  </template>
                </Text>
                <Text v-else-if="inlineToken.type === 'italic'" as="span" class="italic">
                  <template v-if="inlineToken.inline">
                    <template v-for="(nestedToken, m) in inlineToken.inline" :key="m">
                      <MarkdownNested :nested-token="nestedToken" />
                    </template>
                  </template>
                  <template v-else>
                    {{ inlineToken.content }}
                  </template>
                </Text>
                <Text v-else-if="inlineToken.type === 'bold-italic'" as="strong" class="italic">
                  <template v-if="inlineToken.inline">
                    <template v-for="(nestedToken, m) in inlineToken.inline" :key="m">
                      <MarkdownNested :nested-token="nestedToken" />
                    </template>
                  </template>
                  <template v-else>
                    {{ inlineToken.content }}
                  </template>
                </Text>
                <Text v-else-if="inlineToken.type === 'strike'" as="span" class="line-through">
                  <template v-if="inlineToken.inline">
                    <template v-for="(nestedToken, m) in inlineToken.inline" :key="m">
                      <MarkdownNested :nested-token="nestedToken" />
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
            </li>
          </ul>
        </li>
      </ul>
      <br v-else-if="token.type === 'break'" >
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Token, } from '@app/lib/parse-md';
import { parseMarkdown } from '@app/lib/parse-md'
import { PhCheck, PhCopy } from '@phosphor-icons/vue'
import MarkdownInline from '@app/components/markdown/MarkdownInline.vue'
import MarkdownNested from '@app/components/markdown/MarkdownNested.vue'

const props = defineProps<{ markdown: string }>()

const tokens: Token[] = parseMarkdown(props.markdown)

const copiedStates = ref<Record<number, boolean>>({})

const copiedTimeout = ref<NodeJS.Timeout | null>(null)

const copyCode = async (content: string, index: number) => {
  try {
    if (copiedTimeout.value) clearTimeout(copiedTimeout.value)

    await navigator.clipboard.writeText(content)
    copiedStates.value[index] = true

    copiedTimeout.value = setTimeout(() => {
      copiedStates.value[index] = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy code:', err)
  }
}

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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.1s ease-in-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>
