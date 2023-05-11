<template>
    <div class="container" v-if="state.character">
        <h1>{{ state.character.name }}</h1>
        <img v-if="state.character.thumbnail" :src="state.character.thumbnail.path + '.' + state.character.thumbnail.extension" alt="Character image" />
        <p>{{ state.character.description }}</p>
        <h2>Series</h2>
        <ul>
            <li v-for="series in state.character.series?.items" :key="series.resourceURI">
                {{ series.name }}
            </li>
        </ul>
        <h2>Comics</h2>
        <ul>
            <li v-for="comic in state.character.comics?.items" :key="comic.resourceURI">
                {{ comic.name }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCharacterStore } from '~/stores/character'
export default defineComponent({
    name: 'CharacterDetail',
    setup() {
        const Route = useRoute();

        const characterStore = useCharacterStore()
console.log('Route')
console.log(Route.query.id)
        useFetch(async () => {
            await characterStore.fetchCharacterById(Number(Route.query.id))
        })


        return {
            state:characterStore.$state
        }
    }
})
</script>

<style scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
}
img {
    width: 300px;
}
</style>
