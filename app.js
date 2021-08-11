const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))

const path = require('path');

app.set('view engine', 'pug');
app.set('views', 'views')

app.use(express.static(path.join(__dirname, '/assets')))

const homeRouter = require('./routes/home.route')
const authRouter = require('./routes/auth.route')

app.use(authRouter)

app.use(homeRouter)

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log("All Right")
})