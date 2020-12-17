const {User, Course, StudentCourse} = require('../models/index')

class UserConstoller {
    static readStudents(req, res) {
        User.findAll({
            where: {
                role: 'student'
            }
        })
        .then(data => {
            res.render('students',{data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static readStudentCourse(req, res) {
        let id = +req.params.id
        let user;
        let courses;
        User.findByPk(id, {
            include: Course
        })
        .then(data => {
            console.log(data)
            user = data
            return Course.findAll()
        })
        .then(data => {
            courses = data
            res.render('studentcourse', {user, courses})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static addCoursePost(req, res) {
        let id = +req.params.id
        let obj = {
            studentId: id,
            courseId: req.body.courseId
        }
        console.log(obj)
        StudentCourse.create(obj)
        .then(data => {
            res.redirect(`/students/${id}`)
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = UserConstoller