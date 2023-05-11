<template>
    <div class="container">
        <h1>Marvel Characters</h1>
        <input placeholder="search the character name" v-model="filterItems.nameStartsWith"
               @keyup.enter="filterCharacters"/>
        <button @click="filterCharacters">Search</button>
        <ul>
            <li v-for="character in state.characters" :key="character.id">
                <nuxt-link :to="{ name: 'CharacterDetail', query: { id: character.id } }">
                    {{ character.name }}
                </nuxt-link>
            </li>
        </ul>
        <div class="pagination">
            <button @click="changePage(1)" :disabled="loading || (pagination.offset === 0)">First</button>
            <button @click="changePage(pagination.page -1)" :disabled="loading || (pagination.offset === 0)">Prev
            </button>
            <input placeholder="page" v-model="pagination.page" @keyup.enter="changePage(pagination.page)"
                   :disabled="loading"/>
            <button @click="changePage(pagination.page +1)"
                    :disabled="loading || (pagination.offset + pagination.limit >= state.total)">Next
            </button>
            <button @click="changePage(Math.ceil(state.total / pagination.limit))"
                    :disabled="loading || (pagination.offset + pagination.limit >= state.total)">Last
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useCharacterStore} from '~/stores/character'

export default defineComponent({
    setup() {
        const characterStore = useCharacterStore();
        const route = useRoute()
        const router = useRouter()
        const loading = ref(false)
        const pagination = ref({
            limit: 20,
            page: 1,
            offset: 0,
        })
        const initPagination = () => {
            if (route.query['page']) {
                pagination.value.offset = (route.query['page'] - 1) * pagination.value.limit;
                pagination.value.page = Number(route.query['page']);
            }
        }
        initPagination()

        let filterItems = ref({
            nameStartsWith: route.query['nameStartsWith'] || null,
        })
        let params = {
            ['nameStartsWith']: route.query['nameStartsWith'] || null,
            ['limit']: pagination.value.limit,
            ['offset']: pagination.value.offset,
        }

        useFetch(async () => {
            await characterStore.fetchCharacters(params)
        })

        const updateRouterQuery = () => {
            const query = {
                page: pagination.value.page,
                nameStartsWith: params['nameStartsWith'] || undefined,
            }
            router.replace({query})
        }
        const getCharacters = async () => {
            loading.value = true;
            characterStore.fetchCharacters(params).then(() => {
                pagination.value.offset = params.offset;
                pagination.value.limit = params.limit;
                pagination.value.page = Math.floor((params.offset / params.limit) + 1);
                updateRouterQuery();
            }).finally(() => {
                loading.value = false
            })
        }
        const changePage = async (page) => {
            params['offset'] = (page - 1) * pagination.value.limit;
            await getCharacters();
        }
        const filterCharacters = async () => {
            params['offset'] = 0;
            params['nameStartsWith'] = filterItems.value.nameStartsWith ? filterItems.value.nameStartsWith : null;
            await getCharacters();
        }

        return {
            state: characterStore.$state,
            loading,
            pagination,
            filterItems,
            changePage,
            filterCharacters,
        }
    }
})
</script>

<style scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
}

.pagination {
    display: flex;
    justify-content: center;
}
</style>