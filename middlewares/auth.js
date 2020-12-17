const isLoggedIn = (req, res, next) => {
    if (req.session.userId) {
        next()
    } else {
        res.redirect('/login?msg=Tolong Login Terlebih Dahulu')
    }
}

const isAdmin = (req, res, next) => {
    if (req.session.userRole === 'admin') {
        next()
    } else {
        res.redirect('/courses?msg= Anda bukan admin')
    }
}

const log = (req, res, next) => {
    if (req.session.userId) {
        res.redirect('/courses')
    } else {
        next()
    }
}

module.exports = {isLoggedIn, isAdmin, log}