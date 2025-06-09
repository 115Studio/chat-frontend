/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./app/**/*.{js,vue,ts}"
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        default: 'var(--color-default)',
        inset: 'var(--color-inset)',
        border: 'var(--color-border)',
        content: 'var(--color-content)',
        muted: 'var(--color-muted)',
        subtle: 'var(--color-subtle)',
        accent: 'var(--color-accent)',
        critical: 'var(--color-critical)',
        caution: 'var(--color-caution)',
        success: 'var(--color-success)',
        white: 'var(--color-white)',
        black: 'var(--color-black)',
        'text-placeholder': 'var(--color-text-placeholder)',
      },
      fontFamily: {
        sans: ['Onest', 'system-ui', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"'],
      },
      fontSize: {
        'display-xl': ['3.75rem', '4rem'],       // 60px/64px
        'display-md': ['3rem', '3.25rem'],       // 48px/52px
        'display-sm': ['2.625rem', '2.75rem'],   // 42px/44px
        'heading-2xl': ['3rem', '3.25rem'],      // 48px/52px
        'heading-xl': ['2.5rem', '2.75rem'],     // 40px/44px
        'heading-lg': ['2rem', '2.25rem'],       // 32px/36px
        'heading-md': ['1.625rem', '2rem'],      // 26px/32px
        'heading-sm': ['1.25rem', '1.5rem'],     // 20px/24px
        'body-lg': ['1.125rem', '1.75rem'],      // 18px/28px
        'body-md': ['1rem', '1.5rem'],           // 16px/24px
        'body-sm': ['0.875rem', '1.25rem'],      // 14px/20px
        'caption': ['0.75rem', '1rem'],          // 12px/16px
      },
      fontWeight: {
        normal: '400',
        bold: '700',
      },
      transitionDuration: {
        'fast': 'var(--transition-fast)',
        'default': 'var(--transition-default)',
        'long': 'var(--transition-long)',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      }
    },
  },
  plugins: [],
} 