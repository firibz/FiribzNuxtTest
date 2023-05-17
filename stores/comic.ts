import { defineStore } from 'pinia'
import apiService from '~/services/marvel'
import { Comic } from '~/types/marvel'

export const useComicStore = defineStore('comic', {
    state: () => ({
        comics: [] as Comic[],
        comic: {} as Comic,
        total: 0,
    }),
    actions: {
        async fetchComics(params: object) {
            const data = await apiService().getComics(params)
            this.total = data.total
            this.comics = data.results
        },
        async fetchComicById(id: number) {
            this.comic = await apiService().getComicsById(id)
        },
    },
})