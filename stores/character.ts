import { defineStore } from 'pinia'
import apiService from '~/services/marvel'
import { Character } from '~/types/marvel'

export const useCharacterStore = defineStore('character', {
    state: () => ({
        characters: [] as Character[],
        character: {} as Character,
        total: 0,
    }),
    actions: {
        async fetchCharacters(params: object) {
            const data = await apiService().getCharacters(params)
            this.total = data.total
            this.characters = data.results
        },
        async fetchCharacterById(id: number) {
            this.character = await apiService().getCharacterById(id)
        },
    },
})