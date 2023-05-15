<script lang="ts" setup>
definePageMeta({ middleware: ['user-only'] });
const { pending, data } = useLazyFetch('/api/v1/lists/get', { method: 'POST' });

const goToPage = (page: number) => {
    // Fetch data for the selected page using the provided API
};
</script>

<template>
    <div class="container mx-auto py-8">
        <div v-if="pending" class="flex items-center justify-center h-32">
            <div class="text-primary font-semibold animate-pulse">Loading ...</div>
        </div>
        <div v-if="data && data.list">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div v-for="(listItem, index) in data.list" :key="index"
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
                        <div class="w-6 h-6 rounded-full mr-2" :style="{ backgroundColor: listItem.color }"></div>
                        <div>{{ listItem.pantone_value }}</div>
                    </div>
                </div>
            </div>
        </div>
        <nav class="flex justify-center mt-8" v-if="data && data.list">
            <ul class="flex space-x-4">
                <li>
                    <button :disabled="data.page === 1" @click="goToPage(data.page - 1)"
                        class="text-primary font-semibold hover:underline">
                        Previous
                    </button>
                </li>
                <li>
                    <button v-for="page in data.totalPages" :key="page"
                        :class="{ 'text-primary mx-2 font-semibold hover:underline': data.page !== page, 'text-primary font-bold': data.page === page }"
                        @click="goToPage(page)">
                        {{ page }}
                    </button>
                </li>
                <li>
                    <button :disabled="data.page === data.totalPages" @click="goToPage(data.page + 1)"
                        class="text-primary font-semibold hover:underline">
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    </div>
</template>
