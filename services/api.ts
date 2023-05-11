import axios from 'axios'
import md5 from 'md5'
export const createAPI = (baseURL: string) => {
    const api = axios.create({
        baseURL
    })
    // const config2 = useRuntimeConfig()


    api.interceptors.request.use((config) => {
        const ts = Date.now().toString()
        // console.log('process.env.MARVEL_PUBLIC_KEY')
        // console.log(config2.public.marvelPublicKey)
        // console.log('process.env.MARVEL_PRIVATE_KEY')
        // console.log(config2.public.marvelPrivateKey)
        const PublicKey = '8fd1f3f3c40c913f4e2a8d95f11b5e28'
        const PrivateKey = '6f937aaf3de1c950c742f59c232629340639a134'
        const hash = md5(ts + PrivateKey + PublicKey)
        console.log('ts')
        console.log(ts)
        console.log('hash')
        console.log(hash)
        config.params = config.params || {}
        config.params.apikey = PublicKey
        config.params.ts = ts
        config.params.hash = hash
        return config
    })

    return api
}

export const marvelAPI = createAPI('http://gateway.marvel.com/v1/public')
