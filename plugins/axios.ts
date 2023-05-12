import { defineNuxtPlugin } from '#app'
import axios from 'axios'
import md5 from 'md5';
export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    const instance = axios.create({
        baseURL: config.public.API_BASE_URL
    })
    const PublicKey = config.public.MARVEL_PUBLIC_KEY
    const PrivateKey = config.public.MARVEL_PRIVATE_KEY

    instance.interceptors.request.use((config) => {
        const ts = Date.now().toString()
        const hash = md5(ts + PrivateKey + PublicKey)
        config.params = config.params || {}
        config.params.apikey = PublicKey
        config.params.ts = ts
        config.params.hash = hash
        return config
    })

    // you can add interceptors, headers, etc. to the instance here

    nuxtApp.provide('axios', instance) // provide the instance to the app
})