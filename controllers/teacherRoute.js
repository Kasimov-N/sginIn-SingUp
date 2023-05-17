const Teachers = require('../models/Teachers')
const ucer = require('../models/ucer')
const bcrypt = require('bcrypt')


exports.getGroup = async (req, res) => {
    try {
        const data = await Teachers.findById(req.params.id, ["group"])
        res.json({ data })
    }
    catch (err) {
        res.json({ eror: 'Bunday o`qituvchi mavjud emas' })
    }
}
exports.profile = async (req, res) => {
    try {
        const data = await Teachers.findById(req.params.id)
        res.json({ data })
    }
    catch (err) {
        res.json({ eror: 'Bunday o`qituvchi mavjud emas' })
    }
}

exports.SignUpTeacher = async (req, res) => {
    const { login, password } = req.body;
    const data = await ucer.findOne({ login })
    if (data) {
        res.json({ dsc: 'Bunday oqituvchi mavjud' })
    } else {
        const hash = await bcrypt.hash(password, 12);
        const teacher = await ucer.create({ ...req.body, password: hash })
        res.json({ dsc: 'Teacher created', teacher })
    }
}

exports.SignInTeacher = async (req, res) => {
    const { login, password } = req.body;
    const data = await ucer.findOne({ login })
    if (!data) {
        res.json({ dsc: 'Bunday oqituvchi mavjud emas' })
    } else {
        const isValid = await bcrypt.compare(password, data.password)
        if (isValid) {
            res.json({ dsc: 'Success' })
        } else {
            res.json({ dsc: 'Parol xato' })
        }
    }
}