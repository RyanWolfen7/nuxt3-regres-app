<script lang="ts" setup>
        const currentUser = useAuthUser()
</script>

<template>
    <div class="min-h-screen flex flex-col bg-main text-secondary">
        <header class="p-3 mx-auto w-full bg-accent">
            <nav class="flex space gap-3 text-main">
                <NavLink to="/">
                    Home
                </NavLink>
                <div class="flex grow place-items-end text-right">
                    <NavLoggedIn v-if="currentUser" />
                    <NavDefault v-else />
                </div>
            </nav>
        </header>
        <slot />
    </div>
</template>
