<script lang="ts">
    export default {
        name: 'Join',
        data() {
            return {
                form: {
                    userName: '',
                    email: '',
                    password: ''
                },
            }
        },
        methods: {
            async handleSubmit() { 
                const { data, error } = await useFetch('/api/v1/user/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.form)
                })
                if (error.value) {
                    const { message, statusCode } = error.value?.data
                    alert(message)
                }
                if(data.value) {
                    console.log(data.value)
                    alert(data.value);
                } 
            }
        }
    }
</script>

<template>
    <div class="flex items-center justify-center h-screen">
        <div class="bg-secondary p-4">
            <form @submit.prevent="handleSubmit" class="text-center text-accent">
                <input type="text" v-model="form.userName" placeholder="Username" class="w-full bg-grey-500 mb-2 py-2 px-4 rounded text-opacity-100">
                <input type="email" v-model="form.email" placeholder="Email" class="w-full bg-grey-500 mb-2 text-primary py-2 px-4 rounded">
                <input type="password" v-model="form.password" placeholder="Password" class="w-full bg-grey-500 mb-2 text-primary py-2 px-4 rounded">
                <button type="submit" class="w-full bg-main text-secondary py-2 px-4 rounded">Join</button>
            </form>
        </div>
    </div>
</template>
