module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'plugin:vue/essential',
    // '@nuxtjs',
    // 'plugin:nuxt/recommended',
    './node_modules/eslint-config-airbnb-base/rules/best-practices.js',
    './node_modules/eslint-config-airbnb-base/rules/errors.js',
    './node_modules/eslint-config-airbnb-base/rules/es6.js',
    './node_modules/eslint-config-airbnb-base/rules/imports.js',
    './node_modules/eslint-config-airbnb-base/rules/node.js',
    // './node_modules/eslint-config-airbnb-base/rules/strict.js',
    './node_modules/eslint-config-airbnb-base/rules/style.js',
    './node_modules/eslint-config-airbnb-base/rules/variables.js',
  ],
  plugins: [
    'vue',
  ],
  // add your custom rules here
  rules: {
    'max-len': [1, 140, 4],
    'no-restricted-syntax': 'off',
    'no-continue': 'off',
    'no-await-in-loop': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  // solves linting trouble with imports (uses npm:eslint-import-resolver-nuxt-import)
  settings: {
    'import/resolver': {
      'nuxt-import': {
        extensions: ['.mjs', '.js', '.vue', '.json'],
      },
    },
  },
};

