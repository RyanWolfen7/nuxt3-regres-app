<script lang="ts" setup>
    const { logout } = useAuth()
    async function handleClick() {
        try {
            const data = await logout()
            if(data) await navigateTo('/')
        } catch(error) {
            alert(error)
        }
    }
</script>

<template>
    <NavLink to="/dashboard">
        Dashboard
    </NavLink>
    <div @click="handleClick" class="text-2xl cursor-pointer grow hover:text-secondary">
        Logout
    </div>
</template>
