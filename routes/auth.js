// dependencies
const express = require('express')
const userModel = require('../mock/users')

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
    const result = userModel.pwdAuth(req.body.username, req.body.password)
    if (result !== false) {
        // set session
        req.session.isLogin = true
        req.session.userInfo = result

        // set cookie
        if (req.body.remember == 'on') {
            res.cookie('uid', result.id, {
                signed: true, 
                maxAge: 1000 * 60 * 60 * 24 * 30
            })
        } else {
            res.cookie('uid', result.id, {signed: true})
        }

        // redirect to home page
        res.redirect('/')
    } else {
        res.render('message', {
            title: 'Warning',
            message: 'Login failed!'
        })
    }
})

// logout
router.get('/logout', (req, res) => {
    // clear session
    delete req.session.isLogin
    delete req.session.userInfo

    // clear cookie
    res.clearCookie('uid')

    // redirect -> home page -> login page
    res.redirect('/')
})

module.exports = router