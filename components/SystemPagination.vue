<template>
    <div class="pagination">
        <button @click="changePage(1)" :disabled="loading || (pagination.offset === 0)"
                data-test="first-button">First</button>
        <button @click="changePage(pagination.page -1)" :disabled="loading || (pagination.offset === 0)"
                data-test="prev-button">Prev
        </button>
        <input placeholder="page" v-model="pagination.page" @keyup.enter="changePage(pagination.page)"
               :disabled="loading"/>
        <button @click="changePage(pagination.page +1)"
                :disabled="loading || (pagination.offset + pagination.limit >= total)"
                data-test="next-button">Next
        </button>
        <button @click="changePage(maxPage)"
                :disabled="loading || (pagination.offset + pagination.limit >= total)"
                data-test="last-button">Last
        </button>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed, watch} from 'vue'
import { Pagination } from '~/types/pagination'

export default defineComponent({
    props: {
        loading: {
            type: Boolean,
        },
        pagination: {
            type: Object as () => Pagination,
            required: true
        },
        total: {
            type: Number,
            required: true
        }
    },
    setup(props, {emit}) {
        const pagination = ref(props.pagination)
        const maxPage = computed(() => Math.ceil(props.total / pagination.value.limit))

        // use watch to create a side effect when the pagination.page value changes
        watch(() => pagination.value.page, (newVal, oldVal) => {
            // if the input is greater than the maximum, reset it to the maximum
            if (newVal > maxPage.value) {
                pagination.value.page = maxPage.value
                // or show an error message
                // alert('The page number cannot exceed ' + maxPage.value)
            }
        })
        // define a function to emit the change-page event
        const changePage = (page: number) => {
            emit('change-page', page)
        }
        // return the reactive data and functions to be used in the template
        return {
            pagination,
            maxPage,
            changePage
        }
    }
})
</script>
