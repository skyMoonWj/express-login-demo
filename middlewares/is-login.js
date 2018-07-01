const userModel = require('../mock/users')

module.exports = (req, res, next) => {
    if (req.session.isLogin !== true) {
        const result = userModel.cookieAuth(req.signedCookies.uid)
        if (result !== false) {
            req.session.isLogin = true
            req.session.userInfo = result
        } else {
            res.redirect('/login')
            return
        }
    }
    next()
}