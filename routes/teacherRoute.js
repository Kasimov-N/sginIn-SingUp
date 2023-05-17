const { Router } = require('express')
const {
    getGroup,
    profile,
    SignUpTeacher,
    SignInTeacher
} = require('../controllers/teacherRoute')
const { checkLogin } = require('../middleware/checkLogin')
const route = Router()


route.get('/:id', getGroup)
route.get('/profile/:id', profile)
route.post('/auth', checkLogin, SignUpTeacher)
route.put('/auth', checkLogin, SignInTeacher)





module.exports = route