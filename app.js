const express = require('express')
const router = require('./routes/index')
const app = express()
const port = 3000
const session = require('express-session')

app.use(session({
    secret: 'whatever',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}))

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.use('/', router)

app.listen(port, () => {
    console.log('app started')
})