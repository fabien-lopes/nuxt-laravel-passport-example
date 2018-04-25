require("dotenv").config();

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "passport",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Testing oauth with Laravel Passport"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  modules: ["@nuxtjs/axios", "@nuxtjs/auth", "@nuxtjs/dotenv"],

  router: {
    middleware: ["auth"]
  },

  axios: {
    baseURL: process.env.LARAVEL_ENDPOINT
  },
  auth: {
    redirect: {
      login: "/login",
      logout: "/",
      callback: "/login",
      user: "/"
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/oauth/token",
            method: "post",
            propertyName: "access_token"
          },
          logout: false,
          user: false
        }
      },
      passport: {
        _scheme: "oauth2",
        authorization_endpoint:
          process.env.LARAVEL_ENDPOINT + "/oauth/authorize",
        userinfo_endpoint: false,
        scope: "*",
        response_type: "token",
        token_type: "Bearer",
        redirect_uri: undefined,
        client_id: process.env.PASSPORT_CLIENT_ID,
        token_key: "access_token"
      }
    }
  },

  /*
  ** Customize the progress bar color
  */
  loading: { color: "#3B8070" },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};