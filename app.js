// dependencies
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')

// routers and middlewares
const authRouter = require('./routes/auth')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const isLogin = require('./middlewares/is-login')

// use html file as view engine file
var app = express();
app.set('views', path.join(__dirname, 'views'))
app.engine('.html', require('ejs').__express)
app.set('view engine', 'html')

// the secret used to sign the cookie
const cookieSecret = 'a user login system demo using express.'
const sessionSecret = cookieSecret

// middlewares
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(cookieSecret));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    // the secret used to sign the session ID cookie
    secret: sessionSecret,
    // renew the life of the session object after every request
    resave: true,
    // if the session object isn't modified, 
    // the server will not generate the session ID cookie,
    // so the session object will not be stored
    saveUninitialized: false,
    // can not use `MemoryStore` in production environment
    // store: MemoryStore (default)
}))

// the route for debug
app.get('/debug', (req, res) => {
    const session = JSON.stringify(req.session)
    res.send(session)
})

// routes which need not to login authentication
app.use('/', authRouter)

// isLogin authentication
app.use(isLogin)

// routes which need to login authentication
app.use('/', indexRouter)
app.use('/users', usersRouter)

module.exports = app;
