<template>
    <div class="column">
        <div class="card">
            <nuxt-link :to="{ name: 'CharacterDetail', query: { id: character.id } }">
                <img class="character-list-image" :src="character.thumbnail.path + '.' + character.thumbnail.extension"
                     :alt="character.name+' image'">
                <div class=“container”><h4><b>{{ character.name }}</b></h4></div>
            </nuxt-link>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {Character} from '~/types/marvel'

export default defineComponent({
    props: {
        character: {
            type: Object as () => Character,
            required: true
        }
    },
    setup(props) {
        return {
            character: props.character
        }
    }
})
</script>