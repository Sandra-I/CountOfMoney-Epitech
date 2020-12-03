export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/element-ui'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/],
  },

  // METTRE A JOUR AVEC .env
  // Vérifier le runtime config

  // Global axios options to applied to all requests
  axios: {
    //proxy: true,
    // baseURL: process.env.BASE_URL || 'http://localhost:3000/api'
    baseURL: 'http://localhost:34435/'
  },
  

  // Authentification module
  auth: {
    strategies: {
      local: {
        endpoints: {
          // adapter au back
          login: { url: '/sessions', method: 'post', propertyName: 'token' },
          logout: { url: '/sessions/logout', method: 'post' },
          user: { url: '/sessions/user', method: 'get', propertyName: 'user' }
        },
        // tokenRequired: true,
        // tokenType: '',
        // globalToken: true,
        // autoFetchUser: true
      }
    }
  }
}
