<script setup lang="ts">
import type { HeadingElement, HeadingVariant, TextProps } from '@app/types'

const props = defineProps<TextProps>()

if (process.env.NODE_ENV === 'development' && !props.as) {
  throw new Error('You should provide an "as" prop to the Text component')
}

const defineHeadingVariant = (as: HeadingElement): string | null => {
  const variantMap: Record<HeadingElement, HeadingVariant> = {
    h1: 'heading2xl',
    h2: 'headingXl',
    h3: 'headingLg',
    h4: 'headingMd',
    h5: 'headingSm',
  }

  const variant = props.variant ?? variantMap[as]
  return variant ? 'text--variant-' + variant : null
}

const computedClasses = computed(() => {
  const textVariant = defineHeadingVariant(props.as as HeadingElement)

  return {
    'text': true,
    [textVariant as HeadingVariant]: !!textVariant,
    [`text--alignment-${props.alignment}`]: props.alignment,
    [`text--tone-${props.tone}`]: props.tone,
    [`text--weight-${props.weight}`]: props.weight,
    [`text--decoration-${props.textDecoration}`]: props.textDecoration,
    [`text--tracking-${props.tracking}`]: props.tracking,
    'text--uppercase': props.uppercase,
    'text--truncate': props.truncate,
    'text--break': props.breakWord,
  }
})
</script>

<template>
  <Component :is="props.as" :class="computedClasses">
    <slot />
  </Component>
</template>

<style scoped lang="scss">
.text {
  text-align: inherit;

  &--alignment {
    &-start {
      text-align: start;
    }

    &-center {
      text-align: center;
    }

    &-end {
      text-align: end;
    }

    &-justify {
      text-align: justify;
    }
  }

  &--tone {
    &-accent {
      color: var(--color-accent);
    }

    &-critical {
      color: var(--color-critical);
    }

    &-caution {
      color: var(--color-caution);
    }

    &-success {
      color: var(--color-success);
    }

    &-muted {
      color: var(--color-muted);
    }

    &-subtle {
      color: var(--color-subtle);
    }

    &-content {
      color: var(--color-content);
    }
  }

  &--variant {
    &-display {
      font: var(--font-xl-display);

      @media (max-width: 768px) {
        font: var(--font-md-display);
      }

      @media (max-width: 640px) {
        font: var(--font-sm-display);
      }
    }

    &-heading2xl {
      font: var(--font-xl-heading-2xl);

      @media (max-width: 768px) {
        font: var(--font-md-heading-2xl);
      }

      @media (max-width: 640px) {
        font: var(--font-sm-heading-2xl);
      }
    }

    &-headingXl {
      font: var(--font-xl-heading-xl);

      @media (max-width: 768px) {
        font: var(--font-md-heading-xl);
      }

      @media (max-width: 640px) {
        font: var(--font-sm-heading-xl);
      }
    }

    &-headingLg {
      font: var(--font-xl-heading-lg);

      @media (max-width: 768px) {
        font: var(--font-md-heading-lg);
      }

      @media (max-width: 640px) {
        font: var(--font-sm-heading-lg);
      }
    }

    &-headingMd {
      font: var(--font-xl-heading-md);

      @media (max-width: 768px) {
        font: var(--font-md-heading-md);
      }
    }

    &-headingSm {
      font: var(--font-heading-sm);
    }

    &-bodyLg {
      font: var(--font-body-lg);
    }

    &-bodyMd {
      font: var(--font-body-md);
    }

    &-bodySm {
      font: var(--font-body-sm);
    }

    &-caption {
      font: var(--font-caption);
    }
  }

  &--weight {
    &-normal {
      font-weight: 400;
    }

    &-medium {
      font-weight: 500;
    }

    &-bold {
      font-weight: 700;
    }
  }

  &--decoration {
    &-line-through {
      text-decoration: line-through;
    }

    &-underline {
      text-decoration: underline;
    }
  }

  &--tracking {
    &-tighter {
      letter-spacing: -0.05em;
    }

    &-tight {
      letter-spacing: -0.025em;
    }

    &-normal {
      letter-spacing: 0;
    }

    &-wide {
      letter-spacing: 0.025em;
    }

    &-wider {
      letter-spacing: 0.05em;
    }

    &-widest {
      letter-spacing: 0.1em;
    }
  }

  &--uppercase {
    text-transform: uppercase;
  }

  &--truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &--break {
    word-break: normal;
    overflow-wrap: anywhere;
  }
}
</style>
