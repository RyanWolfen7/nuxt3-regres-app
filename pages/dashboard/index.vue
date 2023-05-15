<script lang="ts" setup>
definePageMeta({ middleware: ['user-only'] });
const { createListItem, queryLists, updateListItem, deleteListItem } = useListCalls()
const listData = await useListData()

onMounted(async () => await queryLists(1))

</script>

<template>
    <div class="container mx-auto py-8">
        <div v-if="listData && listData.list">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div v-for="(listItem, index) in listData.list" :key="index"
                    class="bg-secondary rounded-lg shadow-md p-2  m-6 text-main">
                    <div class="flex items-center justify-between mb-2">
                        <div class="text-xl font-semibold">{{ listItem.name }}</div>
                        <div class="flex">
                            <button class="text-primary font-semibold mr-2 hover:underline">Edit</button>
                            <button class="text-error font-semibold hover:underline">Delete</button>
                        </div>
                    </div>
                    <div class="mb-2">{{ listItem.year }}</div>
                    <div class="flex items-center mb-4">
                        <div class="w-6 h-6 rounded-full mr-2" :style="{ backgroundColor: String(listItem.color) }"></div>
                        <div>{{ listItem.pantone_value }}</div>
                    </div>
                </div>
            </div>
        </div>
        <nav class="flex justify-center mt-8" v-if="listData && listData.totalPages > 1">
            <ul class="flex space-x-4">
                <li>
                    <button :disabled="listData.page === 1" @click="async(event) => await queryLists(listData.page - 1)"
                        class="text-primary font-semibold hover:underline">
                        Previous
                    </button>
                </li>
                <li>
                    <button v-for="page in listData.totalPages" :key="page"
                        :class="{ 'text-primary mx-2 font-semibold hover:underline': listData.page !== page, 'text-primary font-bold': listData.page === page }"
                        @click="async(event) => await queryLists(page)">
                        {{ page }}
                    </button>
                </li>
                <li>
                    <button :disabled="listData.page === listData.totalPages" @click="async(event) => await queryLists(listData.page + 1)"
                        class="text-primary font-semibold hover:underline">
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    </div>
</template>
