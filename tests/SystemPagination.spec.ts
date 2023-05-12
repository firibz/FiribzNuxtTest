// import the component and vitest
import { describe, it, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from '../components/SystemPagination.vue'

describe('Pagination.vue', () => {
    it('should disable the next and last buttons if the current page is the last page', async () => {
        // mount the component with some props
        const wrapper = mount(Pagination, {
            props: {
                loading: false,
                pagination: { page: 10, limit: 10, offset: 90 },
                total: 100
            }
        })
        // find the next and last buttons using data-test attribute
        const nextButton = wrapper.find('[data-test="next-button"]')
        const lastButton = wrapper.find('[data-test="last-button"]')
        // assert that the buttons are disabled
        expect(nextButton.attributes('disabled')).toBe('')
        expect(lastButton.attributes('disabled')).toBe('')
    })

    it('should disable buttons when loading is true', async () => {
        // mount the component with some props
        const wrapper = mount(Pagination, {
            props: {
                loading: true,
                pagination: { page: 1, limit: 10, offset: 0 },
                total: 100
            }
        })
        // find all buttons
        const buttons = wrapper.findAll('button')
        // assert that all buttons are disabled
        buttons.forEach(button => {
            expect(button.attributes('disabled')).toBe('')
        })
    })

    it('should replace the input value with the max page value if it is greater than the max page', async () => {
        // mount the component with some props
        const wrapper = mount(Pagination, {
            props: {
                loading: false,
                pagination: { page: 1, limit: 10, offset: 0 },
                total: 100
            }
        })
        // find the input element
        const input = wrapper.find('input')
        // set the input value to a number greater than the max page
        await input.setValue(20)
        // trigger the enter key press
        await input.trigger('keyup.enter')
        // assert that the input value is replaced with the max page value
        expect(input.element.value).toBe('10')
    })

    // define more test cases as needed
})
