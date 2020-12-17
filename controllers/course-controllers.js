const {Course} = require('../models/index')

class CourseController {
    static readCourses(req, res) {
        Course.findAll()
        .then(data => {
            res.render('courses', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }
    
    static add(req, res) {
        res.render('addform')
    }

    static addPost(req, res) {
        const {course_name, lecturer_name, location} = req.body
        let obj = {
            course_name: course_name,
            lecturer_name: lecturer_name,
            location: location
        }
        Course.create(obj)
        .then(data => {
            res.redirect('/courses')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static edit(req, res) {
        let id = +req.params.id
        Course.findByPk(id)
        .then(data => {
            res.render('editform', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static editPost(req, res) {
        let id = +req.params.id
        const {course_name, lecturer_name, location} = req.body
        let obj = {
            course_name: course_name,
            lecturer_name: lecturer_name,
            location: location
        }
        Course.update(obj, {
            where: {
                id: id
            }
        })
        .then(data => {
            res.redirect('/courses')
        })
        .catch(err => {
            res.send(err)
        }) 
    }

    static delete(req, res) {
        let id = +req.params.id
        Course.destroy({
            where: {
                id: id
            }
        })
        .then(data => {
            res.redirect('/courses')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = CourseController