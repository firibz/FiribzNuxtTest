import { defineStore } from 'pinia'
import apiService from '~/services/marvel'
import { Character } from '~/types/marvel'
import { ref } from 'vue'

export const useCharacterStore = defineStore('character', ()=>{
    const characters = ref<Character[]>([])
    const character = ref<Character>({})
    const total = ref(0)

    async function fetchCharacters(params: object) {
        const data = await apiService().getCharacters(params)
        total.value = data.total
        characters.value = data.results
    }

    async function fetchCharacterById(id: number) {
        character.value = await apiService().getCharacterById(id)
    }

    return {
        characters,
        character,
        total,
        fetchCharacters,
        fetchCharacterById,
    }
})