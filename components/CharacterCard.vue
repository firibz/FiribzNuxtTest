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
<style>
.character-list-image {
    height: 250px;
    border-radius: 5px 5px 0 0;
    width: 100%;
}

.card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    height: 335px;
    margin: 10px;
    padding: 0 10px;
    border-radius: 5px; /* 5px rounded corners */
}

/* On mouse-over, add a deeper shadow */
.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

</style>
