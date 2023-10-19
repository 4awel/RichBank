<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: ''
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        async loadData() {
            const response = await axios('/users/account');
            this.username = response.data.email;
        }
    }
}
</script>
<template>

<main>
    <div>
        <h2 style="font-size: 40px;">Имя пользователя: {{ username }}</h2>
    </div>
</main>

</template>
<style scoped>
 
</style>