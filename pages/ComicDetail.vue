<template>
    <div class="container" v-if="state.comic">
        <h1>{{ state.comic.title }}</h1>
        <img class="detail-image" v-if="!loading && state.comic.thumbnail" :src="state.comic.thumbnail.path + '.' + state.comic.thumbnail.extension" alt="Comic image" />
        <p>{{ state.comic.description }}</p>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import { useComicStore } from '~/stores/comic'
export default defineComponent({
    name: 'ComicDetail',
    setup() {
        const Route = useRoute();
        const loading = ref(false)

        const comicStore = useComicStore()
        useFetch(async () => {
            loading.value = true;
            await comicStore.fetchComicById(Number(Route.query.id))
            loading.value = false;
        })


        return {
            state:comicStore.$state,
            loading
        }
    }
})
</script>