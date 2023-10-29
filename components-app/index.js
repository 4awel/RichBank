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
app.use(cors({
    origin: 'http://localhost:5173'
}));

// Settng POST-request -> JSON
app.use(express.json());

// Setting schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    isRegistred: Boolean,
    isDarkTheme: Boolean,
    cards: Array,
    transaction: Array
});

const User = mongoose.model('users', userSchema);

app.post('/users', async function (req, res) {
    //sdenis10@mail.ru
    try {
        const { email } = req.body;
        const { password } = req.body;

        console.log(email, password)
        const users = await User.find();
        for (user of users) {
            if (email == user.email && password == user.password) {
                app.get('/users/account', async function (req, res) {
                    let accountUsers = await User.findOne({ email });
                    // console.log(accountUsers.cards)
                    app.post('/add/card', async function (req, res) {
                        const { number } = req.body;
                        const { svs } = req.body;
                        const { naming } = req.body;
                        const { year } = req.body;
                        const { title } = req.body;

                        const cards = {
                            "number": number,
                            "svs": svs,
                            "naming": naming,
                            "year": year,
                            "title": title,
                            "balance": 0
                        }

                        accountUsers.cards.push(cards)
                        console.log(accountUsers.cards)
                        await accountUsers.save()

                        res.send('ok');
                    });
                    app.put('/upData/theme', async function (req, res) {
                        const { isDarkTheme } = req.body;

                        accountUsers.isDarkTheme = isDarkTheme;
                        console.log(accountUsers.isDarkTheme);
                        await accountUsers.save()

                        res.send(accountUsers)
                    });
                    res.send(accountUsers);
                });
            } else {
                res.status(401);
                console.log('err')
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