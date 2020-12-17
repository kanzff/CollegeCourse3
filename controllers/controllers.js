const {User} = require('../models/index')
const {comparePass} = require('../helpers/bcrypt')

class Controller {

    static home(req, res) {
        res.render('home')
    }

    static register(req, res) {
        res.render('signup')
    }

    static registerPost(req, res) {
        console.log('masuk')
        const {username, password, full_name, role} = req.body
        let obj = {
            username: username,
            password: password,
            full_name: full_name,
            role: role
        }
        User.create(obj)
        .then(data => {
            res.redirect('/login')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static login(req, res) {
        let msg = req.query.msg
        res.render('login', {msg})
    }

    static loginPost(req, res) {
        const {username, password} = req.body

        User.findOne({
            where: {
                username: username
            }
        })
        .then(user => {
            if (user) {
                const isValidPassword = comparePass(password, user.password)
                
                if (isValidPassword) {
                    req.session.userId = user.id
                    req.session.userRole = user.role
                    res.redirect('/courses')
                } else {
                    res.redirect('/login?msg=Username dan Password Invalid')
                }
            } else {
                res.redirect("/login?msg=Username Tidak Ditemukan")
            }
        })
        .catch(err => {
            res.send(err)
        })
    }

    static logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                res.send(err)
            } else {
                res.redirect('/login')
            }
        })
    }
}

module.exports = Controller