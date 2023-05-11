export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
    ],
    runtimeConfig: {
        // The private keys which are only available server-side
        apiSecret: '123',
        // Keys within public are also exposed client-side
        public: {
            marvelPublicKey: process.env.MARVEL_PUBLIC_KEY,
            marvelPrivateKey: process.env.MARVEL_PRIVATE_KEY
        }
    }
})