<script lang="ts" setup>
definePageMeta({ middleware: ['user-only'] })
</script>

<template>
    <template>
        <div class="container mx-auto py-8 bg-secondary">
            <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <!-- <li v-for="(item, index) in items" :key="index" class="bg-white rounded-lg shadow-md p-4">
                    {{ item }}
                </li> -->
            </ul>
        </div>
    </template>
</template>
