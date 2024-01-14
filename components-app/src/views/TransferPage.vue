<script>
import axios from 'axios';
export default {
    data() {
        return {
            summRub: '',
            cardTo: '',
            cardFrom: '',
            cards: '',

            alertErr: false,
            alertSucc: false
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        async loadData() {
            let response = await axios('/users/account');
            this.cards = response.data.cards
        },
        async sendMoney(evt) {
            evt.preventDefault()
            if (this.cardFrom !== this.cardTo && this.summRub != '') {
                await axios
                    .put('/send/money', {
                        cardTo: this.cardTo,
                        cardFrom: this.cardFrom,
                        summRub: this.summRub
                    })
                    .then((res) => {
                        console.log('Money is trasperns!', res)
    
                        this.alertSucc = true
                        this.alertErr = false
    
                        this.cardFrom = '';
                        this.cardTo = '';
                        this.summRub = '';
                    })
                    .catch((err) => {
                        console.log('Error, money is not transperens!', err)
    
                        this.alertErr = true
                        this.alertSucc = false
                    });
            } else {
                this.alertErr = true
            }

        }
    }
}
</script>
<template>
    <form @submit="sendMoney" class="container-transfer">
        <div class="container">
            <label class="lable-transfer" for="tr">
                Номер кредитной карты
                <input v-model="cardTo" type="number" name="numberCard" placeholder="Введите номер карты">
            </label>
            <label class="lable-transfer" for="tr">
                Сумма перевода в рублях
                <input v-model="summRub" type="number" name="summRUB" placeholder="Введите сумму перевода">
            </label>
            <select v-model="cardFrom" name="selectCard" id="tr">
                <option :value="card.number" v-for="(card, index) in cards">{{ card.number }}</option>
            </select>
        </div>
        <button type="submit" class="btn-transfer">Перевести {{ summRub }}</button>
    </form>
    <div v-if="alertErr" style="display: flex; justify-content: center; margin: 20px;" class="alert alert-warning"
        role="alert">
        На счету недостаточно средств!
    </div>
    <div v-if="alertSucc" style="display: flex; justify-content: center; margin: 20px;" class="alert alert-success" role="alert">
        Средства успешно переведены!
    </div>
</template>
<style scoped>
.container-transfer {
    box-shadow: 1px 1px 10px rgb(83, 177, 125);
    border-radius: 20px;
}

.lable-transfer {
    padding: 10px;
    display: flex;
    justify-content: space-between;
}

form {
    border-radius: 20px;
    display: flex;
    flex-direction: column;
}

input {
    background-color: #669b6da6;
    padding: 4px;
    border-radius: 20px;
}

.btn-transfer {
    box-shadow: 1px 1px 10px rgb(83, 177, 125);
    padding: 10px;
    font-size: 18px;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
}

.btn-transfer:hover {
    background-color: rgb(83, 177, 125);
}

select {
    background-color: #488850c2;
    padding: 5px;
    border-radius: 20px;
    width: 100%;
    border: none;
}

select:hover {
    background-color: #3d8045c2;
    cursor: pointer;
}

.container {
    padding: 20px;
}
</style>