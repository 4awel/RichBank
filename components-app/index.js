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
    cards: Array,
    transaction: Array
});

const User = mongoose.model('users', userSchema);

app.post('/users', async function (req, res) {
    const { email } = req.body;
    const { password } = req.body;

    //sdenis10@mail.ru

    const users = await User.find();
    for (user of users) {
        if (email == user.email && password == user.password) {
            app.get('/users/account', async function (req, res) {
                let accountUsers = await User.findOne({ email });
                // console.log(accountUsers.cards)
                app.post('/add/card', async function (req, res) {
                    const {number} = req.body;
                    const {svs} = req.body;
                    const {naming} = req.body;
                    const {year} = req.body;
                    const {title} = req.body;

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
                res.send(accountUsers);
            });
        } else {
            res.status(401);
        }
    }
});