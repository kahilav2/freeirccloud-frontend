import fs from 'fs';

require('dotenv').config();

const { env } = process;
let https;
if (env.usesHTTPS === 'true') {
  https = {
    key: fs.readFileSync(env.sslKeyPath),
    cert: fs.readFileSync(env.sslCertPath),
  };
}

export default {
  env,
  server: {
    port: env.nuxtPort,
    host: '0.0.0.0',
    https,
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'FreeIRC - Free IRC client in the cloud',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '', // TODO: this env_var doesnt exist?
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        href: 'https://fonts.googleapis.com/css?family=Roboto:400,500,600',
        rel: 'stylesheet',
      },
      {
        href: 'https://fonts.googleapis.com/css2?family=Racing+Sans+One&display=swap',
        rel: 'stylesheet',
      },
    ],
    script: [
      {
        src: 'https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js',
        rel: 'preload',
      },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/global.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/firebase.js', mode: 'client' },
    // '~/plugins/firebase.js',
    '~/plugins/api-repositories.js',
    '~/plugins/common.js',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
  ],
  /*
  ** Build configuration
  */
  build: {

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      });
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
