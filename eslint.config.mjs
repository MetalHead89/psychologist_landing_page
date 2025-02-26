import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      indent: ['error', 2, { SwitchCase: 1 }],
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'vue/max-len': ['error', {
        code: 120,
        ignoreHTMLTextContents: true,
        ignoreStrings: true
      }],
      'comma-dangle': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'arrow-parens': ['error', 'as-needed'],
      'linebreak-style': 0,
      'vue/multi-word-component-names': 'off',
      'space-before-function-paren': ['error', {
        anonymous: 'never',
        named: 'never'
      }],
      'vue/html-self-closing': ['error', {
        html: {
          void: 'always'
        }
      }]
    }
  }
)
