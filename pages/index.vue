<template>
    <div class="container">
        <h1>Marvel Characters</h1>
        <div class="row">
            <div class="column" v-for="page in pages" :key="page.name">
                <ThumbnailCard
                        :to="page.name"
                        :title="page.title"
                        :image="page.image"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ThumbnailCard from '~/components/ThumbnailCard.vue' // Import the component here
import MarvelCharacters from "../assets/images/marvel-characters.jpeg";
import MarvelComics from "../assets/images/marvel-comics.jpeg";

export default defineComponent({
    components: {
        ThumbnailCard
    },
    setup() {
        const pages = [
            {
                name: 'CharactersPage',
                title: 'Characters',
                image: MarvelCharacters
            },
            {
                name: 'ComicsPage',
                title: 'Comics',
                image: MarvelComics
            },
        ]

        return {
            pages,
        }
    }
})
</script>