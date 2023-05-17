import { defineStore } from 'pinia'
import apiService from '~/services/marvel'
import { Comic } from '~/types/marvel'
import { ref } from 'vue'

export const useComicStore = defineStore('comic', ()=>{
    const comics = ref<Comic[]>([])
    const comic = ref<Comic>({})
    const total = ref(0)

    async function fetchComics(params: object) {
        const data = await apiService().getComics(params)
        total.value = data.total
        comics.value = data.results
    }

    async function fetchComicById(id: number) {
        comic.value = await apiService().getComicById(id)
    }

    return {
        comics,
        comic,
        total,
        fetchComics,
        fetchComicById,
    }
})