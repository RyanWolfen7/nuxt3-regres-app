<script lang="ts" setup>
    // trying something new
    const { login } = useAuth()
    const emit = defineEmits(['success'])

    const form = reactive({
        data: {
            email: '',
            password: '',
            string: '',
            rememberMe: false
        },
        loading: false
    })
    async function handleSubmit() {
        try {
            form.loading =  true
            await login(form.data.email, form.data.password, form.data.rememberMe)
        } catch(error) {
            alert(error)
        } finally { form.loading = false }
    }
</script>

<template>
    <div class="flex items-center justify-center h-screen">
        <div class="bg-secondary p-4">
            <form @submit.prevent="handleSubmit" class="text-center text-accent">
                <input type="email" v-model="form.data.email" placeholder="Email" class="w-full bg-grey-500 mb-2 text-primary py-2 px-4 rounded">
                <input type="password" v-model="form.data.password" placeholder="Password" class="w-full bg-grey-500 mb-2 text-primary py-2 px-4 rounded">
                <div w-full>
                    <input id="remember-me" v-model="form.data.rememberMe" type="checkbox">
                    <label for="remember-me" ml-1 text-light-100>Remember me</label>
                </div>
                <button type="submit" :disabled="form.loading" class="w-full bg-main text-secondary py-2 px-4 rounded">Login</button>
            </form>
        </div>
    </div>
</template>
