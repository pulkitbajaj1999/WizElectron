import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@main': resolve('src/main'),
        '@lib': resolve('src/lib'),
        '@assets': resolve('src/assets')
      }
    }
  },

  preload: {
    plugins: [externalizeDepsPlugin()]
  },

  renderer: {
    plugins: [react()],
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer'),
        '@components': resolve('src/renderer/src/components'),
        '@context': resolve('src/renderer/src/context'),
        '@i18n': resolve('src/renderer/src/i18n'),
        '@assets': resolve('src/renderer/src/assets'),
      }
    }
  }
})
