<template>
    <div class="card relative">
        <img class="character-list-image" :src="image" :alt="title + ' image'"/>
        <div class="container"><h4><b>{{ title }}</b></h4></div>
        <nuxt-link v-if="to" class="absolute-center z-1 fit"
                   :to="{ name: to, query: { id } }"/>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    props: {
        id: {
            type: Number,
        },
        to: {
            type: String,
        },
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
        }
    }
})
</script>