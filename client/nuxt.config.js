const pkg = require('./package')
const webpack = require('webpack')
module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: '@/plugins/vee-validate',
      ssr: true
    },
    '~/plugins/api.js',
    '~/plugins/user.js',
    '~/plugins/axios.js'

  ],
  toast: {
    position: 'top-right',
    duration: 800,
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    '@nuxtjs/auth',
    // Doc:https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',

  ],
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: 'http://127.0.0.1:4000/api',
    redirectError: {
      401: '/auth/login',
      500: '/'
    }
  },
  auth: {
    redirect: {
      login: '/auth/login'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'meta.token'
          },
          user: {
            url: '/auth/user',
            method: 'get',
            propertyName: 'data'
          },
          logout: {
            url: '/auth/logout',
            method: 'post',
            propertyName: 'data'
          }
        }

      }
    }
  },

  /*
  ** Build configuration
  */
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        '_': 'lodash'
      })
    ],
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
}
