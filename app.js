// dependencies
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')

// routers
const authRouter = require('./routes/auth')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

// use html file as view engine file
var app = express();
app.set('views', path.join(__dirname, 'views'))
app.engine('.html', require('ejs').__express)
app.set('view engine', 'html')

// secret for cookie signature
const cookieSecret = 'a user login demo using express.'
const sessionSecret = cookieSecret

// middlewares
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(cookieSecret));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: sessionSecret,
    resave: true
}))

// routers which need not to login authentication
app.use('/', authRouter)

// isLogin authentication
app.use((req, res, next) => {
    if (req.session.isLogin !== true && req.signedCookies.user != 1) {
        res.redirect('/login')
        return
    }
    next()
})

// routers which need to login authentication
app.use('/', indexRouter)
app.use('/users', usersRouter)

module.exports = app;
