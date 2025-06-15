import tailwindAnimate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
    './app/**/*.{js,vue,ts}',
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1860px',
      },
      colors: {
        'background': 'hsl(var(--background))',
        'default': 'var(--color-default)',
        'inset': 'var(--color-inset)',
        'border': 'hsl(var(--border))',
        'content': 'var(--color-content)',
        'muted': {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        'subtle': 'var(--color-subtle)',
        'accent': {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        'critical': 'var(--color-critical)',
        'caution': 'var(--color-caution)',
        'success': 'var(--color-success)',
        'white': 'var(--color-white)',
        'black': 'var(--color-black)',
        'text-placeholder': 'var(--color-text-placeholder)',
        'foreground': 'hsl(var(--foreground))',
        'card': {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        'popover': {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        'primary': {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        'secondary': {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        'destructive': {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        'input': 'hsl(var(--input))',
        'ring': 'hsl(var(--ring))',
        'chart': {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      fontFamily: {
        sans: [
          'Onest',
          'system-ui',
          'Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
          'Apple Color Emoji"',
          'Segoe UI Emoji"',
        ],
      },
      fontSize: {
        'display-xl': ['3.75rem', '4rem'],
        'display-md': ['3rem', '3.25rem'],
        'display-sm': ['2.625rem', '2.75rem'],
        'heading-2xl': ['3rem', '3.25rem'],
        'heading-xl': ['2.5rem', '2.75rem'],
        'heading-lg': ['2rem', '2.25rem'],
        'heading-md': ['1.625rem', '2rem'],
        'heading-sm': ['1.25rem', '1.5rem'],
        'body-lg': ['1.125rem', '1.75rem'],
        'body-md': ['1rem', '1.5rem'],
        'body-sm': ['0.875rem', '1.25rem'],
        'caption': ['0.75rem', '1rem'],
      },
      fontWeight: {
        normal: '400',
        bold: '700',
      },
      transitionDuration: {
        fast: 'var(--transition-fast)',
        default: 'var(--transition-default)',
        long: 'var(--transition-long)',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [tailwindAnimate],
}
