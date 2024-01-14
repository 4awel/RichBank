// Settng express
let express = require('express');
const app = express();
const port = 3005;

// Settng server
app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});

// Settng db
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/RichBank');

// Settng CORS
let cors = require('cors');
const { mquery } = require("mongoose");
const { parseQuery } = require("vue-router");
app.use(cors({
    origin: 'http://localhost:5173'
}));

// Settng POST-request -> JSON
app.use(express.json());

// Setting schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isRegistred: {
        type: Boolean,
        defualt: false
    },
    isDarkTheme: {
        type: Boolean,
        defualt: false
    },
    cards: [
        {
            number: {
                type: Number,
                required: true,
                unique: true
            },
            svs: {
                type: Number,
                required: true,
            },
            naming: {
                type: String,
                required: true
            },
            year: {
                type: Number,
                required: true,
                unique: true
            },
            title: {
                type: String,
                require: true
            },
            balance: {
                type: Number,
                required: true,
            },
        }
    ],
    transaction: [
        {
            title: {
                type: String,
                require: true
            },
            naming: {
                type: String,
                require: true
            },
            number: {
                type: Number,
                require: true
            },
            price: {
                type: Number,
                require: true
            },
            value: {
                type: String,
            }
        }, { timestemps: true }
    ]
});

const User = mongoose.model('users', userSchema);

app.post('/users', async function (req, res) {
    //sdenis10@mail.ru
    try {
        //  Получаем данные пользователя в тело запроса
        const { email } = req.body;
        const { password } = req.body;

        console.log(email, password)
        const users = await User.find();
        for (user of users) {
            //  если все данные совпадают
            if (email == user.email && password == user.password) {
                app.get('/users/account', async function (req, res) {
                    // Получаем логин пользователя, который соответствует условию
                    let accountUsers = await User.findOne({ email });
                    app.post('/add/card', async function (req, res) {
                        //  Получаеи данные в тело запроса
                        const { number } = req.body;
                        const { svs } = req.body;
                        const { naming } = req.body;
                        const { year } = req.body;
                        const { title } = req.body;

                        //  создаем новую карту в БД
                        const cards = {
                            "number": number,
                            "svs": svs,
                            "naming": naming,
                            "year": year,
                            "title": title,
                            "balance": 0,
                        }

                        // Сохраняем созданное
                        accountUsers.cards.push(cards)
                        console.log(accountUsers.cards)
                        await accountUsers.save()

                        res.send('ok');
                    });
                    app.post('/delete/card', async function (req, res) {
                        // получаем номер карты в тело запроса 
                        const { number } = req.body;

                        let cards = accountUsers.cards;
                        try {
                            const filterCard = cards.filter(card => {
                                if (card.number !== number) {
                                    return card
                                }
                            })
                            accountUsers.cards = filterCard
                            await accountUsers.save()
                            res.send('ok')
                        } catch (err) {
                            res.send(err)
                        }
                    });

                    app.put('/upData/theme', async function (req, res) {
                        //  Получаем данные темы в тело запроса 
                        const { isDarkTheme } = req.body;

                        //  Изменяем и сохраняем полученные данные
                        accountUsers.isDarkTheme = isDarkTheme;
                        console.log(accountUsers.isDarkTheme);
                        await accountUsers.save()

                        res.send(accountUsers)
                    });
                    app.put('/send/money', async function (req, res) {
                        // Получение данных через тело звапроса
                        const { cardTo } = req.body;
                        const { cardFrom } = req.body;
                        const { summRub } = req.body;

                        // поиск карты получателя через бд
                        let userTo = await User.findOne({ "cards.number": cardTo });
                        const userToCard = userTo.cards.find((card) => card.number === cardTo);

                        // поиск карты отправителя через бд
                        let userFrom = await User.findOne({ "cards.number": cardFrom });
                        const userFromCard = userFrom.cards.find((card) => card.number === cardFrom);

                        // console.log(userTo.transaction, userTo)
                        console.log(userFrom, userTo)

                        // если совпадает отправитель и получатель, то выводим ошибку
                        if (userTo._id == userFrom._id) {
                            res.send(406)
                        } else {
                            // если баланс меньше отправленной суммы, то ошибка
                            if (userFromCard.balance < summRub) {
                                res.send(400);
                            } else {
                                // создаем ячейку транзакций для получателя
                                const transactionTo = {
                                    "title": "Перевод",
                                    "naming": userFromCard.naming,
                                    "number": userFromCard.number,
                                    "price": summRub,
                                    "value": 0
                                }
                                userTo.transaction.unshift(transactionTo)

                                // создаем ячейку транзакций для отправителя
                                const transactionFrom = {
                                    "title": "Перевод",
                                    "naming": userToCard.naming,
                                    "number": userToCard.number,
                                    "price": -summRub,
                                    "value": 1
                                }
                                userFrom.transaction.unshift(transactionFrom)

                                // добавляем баланс получателю и убываем его у отправителя
                                userToCard.balance += summRub
                                userFromCard.balance -= summRub
                                console.log('от:', userFromCard)
                                console.log('кому:', userToCard)

                                try {
                                    // сохраняем балансы пользователей в БД
                                    await userFrom.save();
                                    await userTo.save();
                                    console.log('Изменения успешно сохранены:');
                                    res.send(user);
                                } catch (err) {
                                    // в случае ошибке в варианте А, срабатывает ошибка: Б
                                    console.error('Ошибка при сохранении изменений:');
                                    res.status(500).send(err);
                                }
                            }
                        }


                    });
                    res.send(accountUsers);
                });
            } else {
                // если не подходит условие сраатывет ошибка аунтефикации
                res.status(401);
                console.log('Unauthorized')
            }
        }
    } catch (err) {
        res.send(err)
    }
});

app.post('/register/user', async function (req, res) {
    // Получаем данные с клиента
    try {
        const { email } = req.body;
        const { firstPassword } = req.body;
        const { secondPassword } = req.body;

        let password;

        // Проверяемы совпадают ли пароли
        if (firstPassword === secondPassword) {
            // Проверяем что пароль не меньше 6 символов
            password = firstPassword
            if (password.length > 6) {
                let users = new User({
                    email: email,
                    password: password,
                    isRegistred: true,
                    isDarkTheme: false
                });

                // Сохраняем пользователя в БД
                await users.save();

                console.log(users);
                res.send('OK');
            } else {
                res.status('error: password < 6')
            }
        } else {
            res.status('error: password is not matches')
        }
    } catch (err) {
        res.send(err)
    }
});



