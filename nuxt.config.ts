export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
    ],
    runtimeConfig: {
        // The private keys which are only available server-side
        apiSecret: process.env.NUXT_ENV_MARVEL_PRIVATE_KEY,
        // Keys within public are also exposed client-side
        public: {
            MARVEL_PUBLIC_KEY: process.env.NUXT_ENV_MARVEL_PUBLIC_KEY,
            MARVEL_PRIVATE_KEY: process.env.NUXT_ENV_MARVEL_PRIVATE_KEY,
            API_BASE_URL: process.env.NUXT_ENV_API_BASE_URL
        }
    }
})