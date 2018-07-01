const utils = require('../utils')

const users = [
    {
        id: 1,
        name: 'xavier',
        pwd: '123',
        age: 23,
        gender: 'male'
    },
    {
        id: 2,
        name: 'evan',
        pwd: '456',
        age: 30,
        gender: 'male'
    },
    {
        id: 3,
        name: 'ryan',
        pwd: '789',
        age: 34,
        gender: 'male'
    }
]

module.exports = {
    getAll () {
        return users
    },
    cookieAuth (uidCookie) {
        if (uidCookie !== undefined && uidCookie !== false) {
            for (user of users) {
                if (uidCookie == user.id) {
                    const u = utils.obj.shallowCopy(user)
                    delete u.pwd
                    return u
                }
            }
        }
        return false
    },
    pwdAuth (username, password) {
        for (user of users) {
            if (username == user.name && password == user.pwd) {
                const u = utils.obj.shallowCopy(user)
                delete u.pwd
                return u
            }
        }
        return false
    }
}