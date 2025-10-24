import { defineEslintConfig, serverEslintConfig } from './src/eslint.mjs'

const config = defineEslintConfig(serverEslintConfig)

export default config
