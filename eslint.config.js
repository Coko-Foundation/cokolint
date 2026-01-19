import { defineEslintConfig, serverEslintConfig } from './src/eslint.js'

serverEslintConfig[4].languageOptions.sourceType = 'module'
serverEslintConfig[3].rules['import/extensions'][2].js = 'always'

const config = defineEslintConfig(serverEslintConfig)

export default config
