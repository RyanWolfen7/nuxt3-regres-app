<script lang="ts" setup>
    defineProps<{ to: string }>()
</script>

<template>
    <NuxtLink :to="to" class="text-2xl cursor grow hover:text-secondary">
        <slot />
    </NuxtLink>
</template>
