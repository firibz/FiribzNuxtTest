import { marvelAPI } from '~/services/api'
import { Character } from '~/types/marvel'

export const getCharacters = async (params: object) => {
    const { data } = await marvelAPI.get('/characters', { params })
    return data.data
}

export const getCharacterById = async (id: number) => {
    const { data } = await marvelAPI.get(`/characters/${id}`)
    return data.data.results[0] as Character
}