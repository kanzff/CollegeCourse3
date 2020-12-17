const router = require('express').Router()
const user = require('./user-routes')
const course = require('./course-routes')
const Controller = require('../controllers/controllers')
const {log} = require('../middlewares/auth')

router.get('/', Controller.home)

router.get('/signup', Controller.register)

router.post('/signup', Controller.registerPost)

router.get('/login', log, Controller.login)

router.post('/login', Controller.loginPost)

router.get('/logout', Controller.logout)

router.use('/students', user)

router.use('/courses', course)


module.exports = router