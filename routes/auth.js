const express = require('express')
const router = express.Router()

// login page
router.get('/login', (req, res) => {
    if (req.session.isLogin == true) {
        res.redirect('/')
        return
    }
    res.render('auth/login')
})

// login auth
router.post('/login', (req, res) => {
    if (req.body.username == 'xavier' && req.body.password == '123') {
        req.session.isLogin = true
        res.cookie('user', 1, {signed: true})
        res.redirect('/')
    } else {
        res.render('message', {
            title: 'Warning',
            message: 'Login Failure!'
        })
    }
})

// logout
router.get('/logout', (req, res) => {
    delete req.session.isLogin
    res.clearCookie('user')
    res.redirect('/')
})

module.exports = router