const Teachers = require("../models/Teachers")

exports.index = async (req, res) => {
    const data = await Teachers.find({})
    if (data) {
        res.json({ title: 'All teacher', length: data.length, data })
    }
}
exports.show = async (req, res) => {
    const data = await Teachers.findById(req.params.id)
    if (data) {
        res.json({ title: 'Special teacher', data })
    }
}
exports.create = (req, res) => {
    let { firstName, lastName, email, phoneNumber, password, subject } = req.body
    if (firstName && lastName && email && phoneNumber && password && subject) {
        let teacher = new Teachers({
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            subject
        })
        teacher.save()
            .then(data => {
                if (data) {
                    res.json({ title: 'Teacher created', data: data })
                }
            })
    } else {
        res.json('Malumot toliq emas')
    }
}
exports.remove = async (req, res) => {
    const data = await Teachers.findByIdAndDelete(req.params.id)
    if (data) {
        res.json({ title: 'Teacher Deleted' })
    }
}
exports.edit = async (req, res) => {
    let { firstName, lastName, email, phoneNumber, password, subject } = req.body
    if (firstName || lastName || email || phoneNumber || password || subject) {
        const data = await Teachers.findByIdAndUpdate(req.params.id, req.body)
        if (data) {
            res.json({ title: 'Teacher Updated', data:data })
        }
    } else {
        res.json('Malumot yoq')
    }
}