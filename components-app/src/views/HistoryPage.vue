<script>
import axios from 'axios';

export default {
    data() {
        return {
            transactions: '',
            scroll: false
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        async loadData() {
            const response = await axios('/users/account');
            this.transactions = response.data.transaction
            if (this.transactions.length >= 10) {
                this.scroll = true
            }
        },
    }
}
</script>
<template>
    <main>
        <div class="container-history">
            <h2>История</h2>
            <div style="padding: 8px;" class="container" :class="{'scroll': scroll}">
                <div v-for="(transaction) in transactions" :class="{
                    'plus-item': transaction.price > 0,
                    'minus-item': transaction.price < 0
                }">
                    <b>{{ transaction.title }}</b>
                    <span>{{ transaction.number }}</span>
                    <span>{{ transaction.naming }}</span>
                    <span>{{ transaction.price }}р</span>
                </div>
            </div>
        </div>
    </main>
</template>
<style scoped>
.container-history {
    padding: 20px;
    box-shadow: 1px 1px 10px rgb(83, 177, 125);
    border-radius: 20px;
}

h2 {
    font-size: 46px;
    font-weight: 600;
}

.scroll {
    height: 50vh;
    overflow-y: scroll;
}

@media (max-height: 800px) {

    .container {
        height: 50vh;
        overflow-y: scroll;
    }
}


.plus-item {
    font-weight: 600;
    box-shadow: 1px 1px 10px rgb(83, 177, 125);
    background-color: rgba(83, 177, 125, 0.493);
    border-radius: 6px;
    padding: 10px;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    margin: 8px 4px;
}

.minus-item {
    font-weight: 600;
    box-shadow: 1px 1px 10px rgb(167, 54, 54);
    background-color: rgba(177, 86, 86, 0.493);
    border-radius: 6px;
    padding: 10px;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    margin: 8px 4px;
}
</style>