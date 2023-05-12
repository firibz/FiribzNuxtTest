<template>
    <div class="container">
        <h1>Marvel Characters</h1>
        <input placeholder="search the character name" v-model="filterItems.nameStartsWith"
               @keyup.enter="filterCharacters"/>
        <button :disabled="loading" @click="filterCharacters">Search</button>
        <ul>
            <li v-for="character in state.characters" :key="character.id">
                <nuxt-link :to="{ name: 'CharacterDetail', query: { id: character.id } }">
                    {{ character.name }}
                </nuxt-link>
            </li>
        </ul>
        <SystemPagination :loading="loading" :pagination="pagination" :total="state.total" @change-page="changePage"/>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useCharacterStore } from '~/stores/character'
import SystemPagination from '~/components/SystemPagination.vue'
import { Pagination } from '~/types/pagination'

export default defineComponent({
    components: {
        SystemPagination
    },
    setup() {
        const characterStore = useCharacterStore()
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
            nameStartsWith: route.query.nameStartsWith || null
        })
        let params = {
            nameStartsWith: route.query.nameStartsWith || null,
            limit: pagination.value.limit,
            offset: pagination.value.offset
        }

        useFetch(async () => {
            await characterStore.fetchCharacters(params)
        })

        const updateRouterQuery = () => {
            const query = {
                page: pagination.value.page,
                nameStartsWith: params.nameStartsWith || undefined
            }
            router.replace({ query })
        }
        const getCharacters = async () => {
            loading.value = true
            characterStore.fetchCharacters(params).then(() => {
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
            await getCharacters()
        }
        const filterCharacters = async () => {
            params.offset = 0
            params.nameStartsWith = filterItems.value.nameStartsWith ? filterItems.value.nameStartsWith : null
            await getCharacters()
        }

        return {
            state: characterStore.$state,
            loading,
            pagination,
            filterItems,
            changePage,
            filterCharacters
        }
    }
})
</script>

<style scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
}
</style>