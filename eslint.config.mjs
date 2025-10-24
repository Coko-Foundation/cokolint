import { defineEslintConfig, server } from './src/eslint.mjs'

const config = defineEslintConfig(server)

export default config
