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
                const { data: response } = await useFetch('/api/v1/user/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.form)
                })

                if (response) {
                    alert(response.value);
                }
            }
        }
    }
</script>

<template>
    <div class="flex items-center justify-center h-screen">
        <div class="bg-secondary p-4">
            <form @submit.prevent="handleSubmit" class="text-center">
                <input type="text" v-model="form.userName" placeholder="Username" class="w-full mb-2 bg-secondary !important text-primary py-2 px-4 rounded" autocomplete="off">
                <input type="email" v-model="form.email" placeholder="Email" class="w-full mb-2 bg-secondary !important text-primary py-2 px-4 rounded" autocomplete="off">
                <input type="password" v-model="form.password" placeholder="Password" class="w-full mb-2 bg-secondary !important text-primary py-2 px-4 rounded" autocomplete="off">
                <button type="submit" class="w-full bg-main text-secondary py-2 px-4 rounded">Join</button>
            </form>
        </div>
    </div>
</template>
