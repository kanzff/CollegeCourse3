const router = require('express').Router()
const UserController = require('../controllers/user-controllers')
const {isLoggedIn, isAdmin} = require('../middlewares/auth')


router.use(isLoggedIn)

router.get('/', UserController.readStudents)

router.get('/:id', UserController.readStudentCourse)

router.post('/:id', UserController.addCoursePost)


module.exports = router



