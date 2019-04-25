import pkg from './package'
const env = require('dotenv').config()
export default {
    mode: 'spa',
    env: env.parsed,

    /*
     ** Headers of the page
     */
    head: {
        title: pkg.name,
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: pkg.description
            }
        ],
        script: [
            {
                defer: 'defer',
                src: 'https://use.fontawesome.com/releases/v5.8.1/js/all.js',
                integrity:
                    'sha384-g5uSoOSBd7KkhAMlnQILrecXvzst9TdC09/VM+pjDTCM+1il8RHz5fKANTFFb+gQ',
                crossorigin: 'anonymous'
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css',
                integrity:
                    'sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf',
                crossorigin: 'anonymous'
            }
        ]
    },
    router: {
        middleware: 'router-auth',
        extendRoutes(routes, resolve) {
            routes.push({
                name: 'custom',
                path: '*',
                component: resolve(__dirname, 'pages/404.vue')
            })
        }
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },

    /*
     ** Global CSS
     */
    css: [],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: '~/plugins/firebase.js' },
        { src: '~/plugins/nuxt-client-init.js' }
    ],

    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        // Doc:https://github.com/nuxt-community/modules/tree/master/packages/bulma
        '@nuxtjs/bulma',
        'nuxt-buefy'
    ],
    /*
     ** Axios module configuration
     */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
    },

    /*
     ** Build configuration
     */
    build: {
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
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    }
}
