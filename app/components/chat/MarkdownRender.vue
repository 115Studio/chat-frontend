<script setup lang="ts">
import markdownit from 'markdown-it'
import { useHljs } from '@app/lib/useHljs'

const hljs = useHljs()

const props = defineProps<{
  content: string
}>()

const md = markdownit({
  linkify: true,
  typographer: true,
  highlight: (str: string, lang: string) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (e) {
        console.error(`Error highlighting code: ${e}`);
      }
    }

    return '';
  }
})

const defaultRender = md.renderer.rules.link_open || ((tokens: any, idx: any, options: any, env: any, self: any) => {
  return self.renderToken(tokens, idx, options);
});

md.renderer.rules.link_open = (tokens: any, idx: any, options: any, env: any, self: any) => {
  tokens[idx].attrSet('target', '_blank');
  return defaultRender(tokens, idx, options, env, self);
};

function addCopyButtons() {
  document.querySelectorAll('.markdown pre').forEach((preEl) => {
    if (preEl.querySelector('button.copy-btn')) return;

    const copyButton = document.createElement('div');
    copyButton.id = `copy-btn`;
  })
}

onMounted(() => {
  addCopyButtons();

  document.getElementById('copy-btn')
});
</script>

<template>
  <div :id="'ababa'"/>
  <div class="markdown" v-html="md.render(props.content.trim())"/>
</template>

<style lang="scss">
.markdown {
  h1 {
    @apply my-4;

    font: var(--font-xl-heading-lg);
    @media (max-width: 768px) {
      font: var(--font-md-heading-lg);
    }
    @media (max-width: 640px) {
      font: var(--font-sm-heading-lg);
    }
  }
  h2 {
    @apply my-4;

    font: var(--font-xl-heading-md);

    @media (max-width: 768px) {
      font: var(--font-md-heading-md);
    }
  }
  h3 {
    @apply my-4;
    font: var(--font-heading-sm);
  }
  h4 {
    @apply my-4;
    font: var(--font-body-lg);
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
    @apply relative rounded-2xl p-3 my-4;
    overflow-y: hidden;
    overflow-x: auto;
    background: white;

    border: 1px solid var(--color-border-default);
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
