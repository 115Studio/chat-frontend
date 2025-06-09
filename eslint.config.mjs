import eslintConfigPrettier from 'eslint-config-prettier'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  plugins: {
    eslintConfigPrettier,
  },
  ignores: ['@app/components/graphics/*'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/html-button-has-type': 'warn',
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': ['warn', { singleline: { max: 5 } }],
  },
})
