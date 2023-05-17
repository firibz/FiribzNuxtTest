<template>
    <div class="container">
        <h1>Marvel comics</h1>
        <input placeholder="search the comic name" v-model="filterItems.titleStartsWith"
               @keyup.enter="filterComics"/>
        <button :disabled="loading" @click="filterComics">Search</button>
        <div class="row">
            <div class="column" v-for="comic in state.comics" :key="comic.id">
                <ThumbnailCard :id="comic.id"
                               to="ComicDetail"
                               :title="comic.title"
                               :image="comic.thumbnail.path + '.' + comic.thumbnail.extension"/>
            </div>
        </div>
        <SystemPagination class="my-md" :loading="loading" :pagination="pagination" :total="state.total"
                          @change-page="changePage"/>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useComicStore } from '~/stores/comic'
import SystemPagination from '~/components/SystemPagination.vue'
import ThumbnailCard from '~/components/ThumbnailCard.vue' // Import the component here
import { Pagination } from '~/types/pagination'

export default defineComponent({
    components: {
        SystemPagination,
        ThumbnailCard
    },
    setup() {
        const comicStore = useComicStore()
        const route = useRoute()
        const router = useRouter()
        const loading = ref(false)
        const pagination = ref<Pagination>({
            limit: 20,
            page: 1,
            offset: 0
        })
        const initPagination = () => {
            if (route.query.page) {
                pagination.value.offset = (Number(route.query.page) - 1) * pagination.value.limit
                pagination.value.page = Number(route.query.page)
            }
        }
        initPagination()

        let filterItems = ref({
            titleStartsWith: route.query.titleStartsWith || null
        })
        let params = {
            titleStartsWith: route.query.titleStartsWith || null,
            limit: pagination.value.limit,
            offset: pagination.value.offset
        }

        useFetch(async () => {
            await comicStore.fetchComics(params)
        })

        const updateRouterQuery = () => {
            const query = {
                page: pagination.value.page,
                titleStartsWith: params.titleStartsWith || undefined
            }
            router.replace({ query })
        }
        const getComics = async () => {
            loading.value = true
            comicStore.fetchComics(params).then(() => {
                pagination.value.offset = params.offset
                pagination.value.limit = params.limit
                pagination.value.page = Math.floor(params.offset / params.limit + 1)
                updateRouterQuery()
            }).finally(() => {
                loading.value = false
            })
        }
        const changePage = async (page: number) => {
            params.offset = (page - 1) * pagination.value.limit
            await getComics()
        }
        const filterComics = async () => {
            params.offset = 0
            params.titleStartsWith = filterItems.value.titleStartsWith ? filterItems.value.titleStartsWith : null
            await getComics()
        }

        return {
            state: comicStore.$state,
            loading,
            pagination,
            filterItems,
            changePage,
            filterComics
        }
    }
})
</script>