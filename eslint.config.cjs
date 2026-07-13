const pluginVue = require('eslint-plugin-vue')
const globals = require('globals')

module.exports = [
  ...pluginVue.configs['flat/recommended'],
  {
    // 指定要套用這些規則的檔案類型
    files: ['**/*.js', '**/*.vue'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    rules: {
      'no-unused-vars': 'warn', // 宣告但未使用的變數顯示警告
      'no-undef': 'error', // 使用未宣告的變數直接報錯
      'no-var': 'error', // 禁用 var，強制使用 let 或 const
      eqeqeq: ['error', 'always'], // 強制使用 === 和 !==，不使用會自動轉型的 == 與 !=
      quotes: ['error', 'single'], // 強制字串使用 單引號
      indent: ['error', 2], //縮排2格
      'vue/html-indent': ['error', 2], // Vue 檔案的 template 內部縮排也同步改為 Tab
      'vue/multi-word-component-names': 'off', // 關閉單一單字元件命名限制（允許 Home.vue, About.vue）
      semi: ['error', 'never'], // 強制結尾「不加」分號
    },
  },
]
