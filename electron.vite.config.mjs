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
        '@views': resolve('src/renderer/src/views'),
        '@layout': resolve('src/renderer/src/layout'),
        '@components': resolve('src/renderer/src/components'),
        '@context': resolve('src/renderer/src/context'),
        '@i18n': resolve('src/renderer/src/i18n'),
        '@assets': resolve('src/renderer/src/assets'),
        '@utility': resolve('src/renderer/src/utility')
      }
    }
  }
})
