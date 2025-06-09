export default {
  plugins: ['stylelint-order'],
  rules: {},
  overrides: [
    {
      files: ['*.scss', '**/*.scss', '**/*.vue', '*.vue', '**/*.css', '*.css'],
      extends: ['stylelint-config-recommended-vue/scss', 'stylelint-config-hudochenkov/order'],
      rules: {
        // Stylistic Issues
        'at-rule-empty-line-before': [
          'always',
          {
            except: ['first-nested'],
            ignore: ['after-comment', 'blockless-after-same-name-blockless'],
            severity: 'warning',
          },
        ],
        'color-hex-length': ['short', { severity: 'warning' }],
        'comment-whitespace-inside': ['always', { severity: 'warning' }],
        'declaration-empty-line-before': [
          'always',
          {
            except: ['first-nested', 'after-declaration'],
            ignore: ['after-comment'],
            severity: 'warning',
          },
        ],
        'font-family-name-quotes': ['always-unless-keyword', { severity: 'warning' }],
        'font-weight-notation': ['numeric', { severity: 'warning' }],
        'function-name-case': ['lower', { severity: 'warning' }],
        'function-url-quotes': ['always', { severity: 'warning' }],
        'function-calc-no-unspaced-operator': [true, { severity: 'warning' }],
        'length-zero-no-unit': [true, { ignore: ['custom-properties'], severity: 'warning' }],
        'rule-empty-line-before': [
          'always',
          { except: ['first-nested'], ignore: ['after-comment'], severity: 'warning' },
        ],
        'selector-attribute-quotes': ['always', { severity: 'warning' }],
        'selector-pseudo-element-colon-notation': ['double', { severity: 'warning' }],
        'selector-type-case': ['lower', { severity: 'warning' }],

        // Limit language features
        'function-url-no-scheme-relative': [true, { severity: 'warning' }],
        'shorthand-property-no-redundant-values': [true, { severity: 'warning' }],
        'value-no-vendor-prefix': [true, { severity: 'warning' }],
        'at-rule-no-vendor-prefix': [true, { severity: 'warning' }],
        'selector-max-id': 0,
        'media-feature-name-no-vendor-prefix': [true, { severity: 'warning' }],
        'color-function-notation': ['modern', { severity: 'warning' }],

        // Possible errors
        'function-linear-gradient-no-nonstandard-direction': true,
        'function-no-unknown': true,
        'string-no-newline': true,
        'unit-no-unknown': true,
        'keyframe-declaration-no-important': true,
        'declaration-block-no-shorthand-property-overrides': true,
        'selector-pseudo-class-no-unknown': true,
        'selector-pseudo-element-no-unknown': true,
        'no-duplicate-selectors': true,
        'keyframe-block-no-duplicate-selectors': true,
        'font-family-no-duplicate-names': true,
        'font-family-no-missing-generic-family-keyword': true,
        'block-no-empty': [true, { severity: 'warning' }],
        'comment-no-empty': [true, { severity: 'warning' }],
        'no-duplicate-at-import-rules': true,
        'no-empty-source': [true, { severity: 'warning' }],
        'no-irregular-whitespace': true,
        'declaration-block-no-duplicate-custom-properties': true,
        'named-grid-areas-no-invalid': true,
        'no-invalid-position-at-import-rule': true,
      },
    },
  ],
}
