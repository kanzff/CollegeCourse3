const router = require('express').Router()
const CourseController = require('../controllers/course-controllers')
const {isLoggedIn, isAdmin} = require('../middlewares/auth')

router.use(isLoggedIn)

router.get('/', CourseController.readCourses)

router.get('/add', isAdmin, CourseController.add)

router.post('/add', CourseController.addPost)

router.get('/edit/:id', isAdmin, CourseController.edit)

router.post('/edit/:id', CourseController.editPost)

router.get('/delete/:id', isAdmin, CourseController.delete)

module.exports = router