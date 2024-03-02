// @ts-ignore
import { fileURLToPath } from 'url'
// import { faviconsPlugin } from '@darkobits/vite-plugin-favicons'
import autoprefixer from 'autoprefixer'
import { visualizer } from 'rollup-plugin-visualizer'
import tailwindcss from 'tailwindcss'
import unpluginAutoImport from 'unplugin-auto-import/vite'
import unpluginIconsResolver from 'unplugin-icons/resolver'
import unpluginIcons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import solidPlugin from 'vite-plugin-solid'

import packageJSON from './package.json'

const logoWhite = './src/assets/svgs/logo/white.svg'
const black = '#000000'

export default defineConfig({
  plugins: [
    solidPlugin(),

    // solidSvg(),

    // https://vite-pwa-org.netlify.app/guide/
    // https://github.com/vite-pwa/vite-plugin-pwa/compare/v0.18.2...v0.19.0
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   // manifest: false,
    //   devOptions: {
    //     enabled: true,
    //   },
    //   pwaAssets: {
    //     preset: 'minimal-2023',
    //     overrideManifestIcons: true,
    //   },
    //   mode: 'development',
    //   workbox: {
    //     skipWaiting: true,
    //     cleanupOutdatedCaches: true,
    //     clientsClaim: true,
    //     globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff2,ttf,md}'],
    //   },
    // }),

    unpluginAutoImport({
      imports: ['solid-js', '@solidjs/router'],
      dts: './src/types/auto-imports.d.ts',
      resolvers: [
        unpluginIconsResolver({
          prefix: 'Icon',
          extension: 'jsx',
        }),
      ],
    }),

    unpluginIcons({ autoInstall: true, compiler: 'solid' }),

    // faviconsPlugin({
    //   cache: true,
    //   appName: packageJSON.name[0].toUpperCase() + packageJSON.name.slice(1),
    //   appDescription: packageJSON.description,
    //   start_url: '/',
    //   theme_color: black,
    //   background: black,
    //   icons: {
    //     favicons: {
    //       source: logoWhite,
    //       background: black,
    //       offset: 5,
    //     },
    //     android: {
    //       source: logoWhite,
    //       background: black,
    //       offset: 10,
    //     },
    //     appleIcon: {
    //       background: black,
    //       source: logoWhite,
    //       offset: 10,
    //     },
    //     appleStartup: {
    //       background: black,
    //       source: logoWhite,
    //       offset: 15,
    //     },
    //   },
    // }),

    visualizer({
      template: 'treemap',
      filename: './visualizer/treemap.html',
    }),

    visualizer({
      template: 'network',
      filename: './visualizer/network.html',
    }),

    visualizer({
      template: 'sunburst',
      filename: './visualizer/sunburst.html',
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '/src': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer(), tailwindcss()],
    },
  },
})
