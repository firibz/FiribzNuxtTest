import { Character, Comic } from '~/types/marvel'
import { useNuxtApp } from '#app'

export default function apiService() {
    const nuxtApp = useNuxtApp()
    const axios = nuxtApp.$axios // get the axios instance from the app

    return {
        async getCharacterById(id: number)  {
            const { data } = await axios.get(`/characters/${id}`)
            return data.data.results[0] as Character
        },
        async getCharacters(params: object)  {
            const { data } = await axios.get('/characters', { params })
            return data.data
        },
        async getComicsById(id: number)  {
            const { data } = await axios.get(`/comics/${id}`)
            return data.data.results[0] as Comic
        },
        async getComics(params: object)  {
            const { data } = await axios.get('/comics', { params })
            return data.data
        },
    }
}