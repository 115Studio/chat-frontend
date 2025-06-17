<script setup lang="ts">
import markdownit from 'markdown-it'
import { useHljs } from '@app/lib/useHljs'

const hljs = useHljs()

const props = defineProps<{
  content: string
}>()

const codeMap = ref<Record<string, [ string, string ]>>({})

const recordHeader = (lang: string, code: string) => {
  codeMap.value = {}

  const actualId = Math.random().toString(36).substring(2, 15)

  codeMap.value[actualId] = [ lang, code ]

  return 'code-header-' + actualId
}

const md = markdownit({
  linkify: true,
  typographer: true,
  highlight: (str: string, lang: string) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<div id="${recordHeader(lang, str)}"></div>` + `<div class="code">${hljs.highlight(str, { language: lang }).value}</div>`
      } catch (e) {
        console.error(`Error highlighting code: ${e}`)
      }
    }

    return `<div id="${recordHeader(lang, str)}"></div>` + `<div class="code">${str}</div>`
  }
})

const defaultRender = md.renderer.rules.link_open || ((tokens: any, idx: any, options: any, env: any, self: any) => {
  return self.renderToken(tokens, idx, options)
})

md.renderer.rules.link_open = (tokens: any, idx: any, options: any, env: any, self: any) => {
  tokens[idx].attrSet('target', '_blank')
  return defaultRender(tokens, idx, options, env, self)
}
//
// function addCodeHeaders() {
//   document.querySelectorAll('.internal-code-block-header').forEach((preEl) => {
//     const id = preEl.classList.item(2)?.split('id-')[1] || randomId()
//     const language = preEl.classList.item(1)?.split('lang-')[1] || 'txt'
//     const code = preEl.querySelector('.c-b-c')!.innerHTML.trim()
//
//     codeMap.value[id] = [ language, code ]
//
//     const exists = document.getElementById(`code-header-${id}`)
//
//     if (!exists) {
//       const codeHeaderIgnore = document.createElement('div')
//       codeHeaderIgnore.id = `code-header-${id}`
//       codeHeaderIgnore.className = `internal-ignore`
//       preEl.prepend(codeHeaderIgnore)
//     }
//   })
// }
//
// onMounted(() => {
//   addCodeHeaders()
// })
//
// const codeHeadersDebounced = debounce(() => {
//   addCodeHeaders()
//   console.log('Code headers updated:', codeMap.value)
// }, 100)
//
// watch(() => props.content, () => {
//   codeHeadersDebounced()
// })
</script>

<template>
  <div class="markdown" v-html="md.render(props.content.trim())"/>
  <template v-for="([ i, [ language, code ]]) of Object.entries(codeMap)">
    <Teleport defer :to="'#' + `code-header-${i}`">
      <div class="code-block-header">
        <Text v-if="language" as="p" class="font-mono text-md">
          {{ language }}
        </Text>
        <CopyButton :value="code" />
      </div>
    </Teleport>
  </template>
</template>

<style lang="scss">
.code-block-header {
  @apply flex justify-between items-center mb-1 pb-1 bg-white border-b border-neutral-200;
}

.markdown {
  h1 {
    @apply mt-8 mb-4;

    font: var(--font-xl-heading-lg);

    @media (max-width: 768px) {
      font: var(--font-md-heading-lg);
    }

    @media (max-width: 640px) {
      font: var(--font-sm-heading-lg);
    }
  }

  h2 {
    @apply mt-8 mb-4;

    font: var(--font-xl-heading-md);

    @media (max-width: 768px) {
      font: var(--font-md-heading-md);
    }
  }

  h3 {
    @apply mt-6 mb-3;
    font: var(--font-heading-sm);
  }

  h4 {
    @apply mt-4 mb-2;
    font: var(--font-body-lg);
  }

  h5 {
    @apply mt-3 mb-1.5;
    font: var(--font-body-md);
  }

  h6 {
    @apply mt-2 mb-1;
    font: var(--font-body-sm);
  }

  h1, h2, h3, h4, h5, h6 {
    line-height: 1.2;
    color: var(--color-content);
  }

  p {
    line-height: 1.6;
    color: var(--color-content);
    font: var(--font-body-md);
  }

  li::marker {
    color: var(--color-muted);
  }

  hr {
    @apply my-5;
  }

  ul, menu {
    padding-left: 1em;
    list-style: disc;

    ul {
      list-style-type: circle;
    }
  }

  ol {
    padding-left: 1em;
    list-style: decimal;
  }

  img, p img {
    height: auto;
    border-radius: 12px;
    object-fit: cover;
    @apply max-w-96 no-drag-no-select;
  }

  a {
    color: var(--color-accent);
    @apply hover:opacity-70 transition-opacity duration-200;
  }

  blockquote {
    margin: 0;
    border-left: 3px solid #9ca3af;
    @apply pl-3;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    @apply rounded-lg bg-neutral-100;

    th, td {
      padding: 0.5em;
      border: 1px solid var(--color-border-default);
      text-align: left;
    }

    th {
      font-weight: bold;
    }

    tr:nth-child(even) {
      @apply bg-neutral-200;
    }
  }

  p code, strong code, em code, b code, i code {
    @apply bg-white px-1 py-0.5 rounded text-sm font-mono;
  }

  pre {
    @apply relative rounded-2xl p-3 px-5 my-4 max-w-[95%];
    background: white;

    border: 1px solid var(--color-border-default);
  }

  .code {
    overflow-y: hidden;
    overflow-x: auto;
  }

  .copy-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 4px 8px;
    font-size: 12px;
    font-weight: 500;
    color: #6b7280;
    background: #f9fafb;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    z-index: 10;

    &:hover {
      background: #f3f4f6;
      border-color: #9ca3af;
      color: #374151;
    }

    &:active {
      background: #e5e7eb;
      transform: translateY(1px);
    }
  }
}

.no-drag-no-select {
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>
