<script lang="ts" setup>
definePageMeta({ middleware: ['user-only'] })
const { pending, data } = useLazyFetch('/api/v1/lists/get', { method: 'POST' })
watch(data, (newData) => {
})
</script>


<template>
    <div class="container mx-auto py-8">
        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-if="pending" class="flex items-center justify-center h-32">
                <div class="text-primary font-semibold animate-pulse">Loading ...</div>
            </div>
            <div v-else-if="data && data.list">
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
        </ul>
    </div>
</template>
