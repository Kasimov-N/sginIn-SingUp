const Teachers = require("../models/Teachers")

exports.index = async (req, res) => {
    const { idTeacher } = req.query
    const data = await Teachers.findById(idTeacher, ["group"])
    if (data) {
        res.json({ title: 'All teacher', data })
    }
}
exports.show = async (req, res) => {
    const data = await Teachers.findById(req.query.idTeacher).select({group: {$elemMatch: {_id: req.params.id}}})
    if (data) {
        res.json({ title: 'Special group', data })
    }else{
        res.json({ title: 'Xato' })
    }
}
exports.create = async (req, res) => {
    let { title, day, time } = req.body
    let { idTeacher } = req.query
    try {
        const idTeacherCheck = await Teachers.findById(idTeacher)
        if (title && day && time) {
            const data = await Teachers.findByIdAndUpdate(idTeacher, { $push: { group: req.body } })
            if (data) {
                res.json({ title: 'Group added to teacher', data })
            } else {
                res.json('Xatolik')
            }
        } else {
            res.json('Malumot toliq emas')
        }
    }
    catch (err) {
        res.json({ title: 'Error', err })
    }
}
exports.remove = async (req, res) => {
    if (req.query.idTeacher && req.query.idGroup) {
        const data = await Teachers.findByIdAndUpdate(req.query.idTeacher, { $pull: { group: { _id :req.query.idGroup}}})
        res.json({ title: 'Group Deleted' })
    }
}
exports.update = async (req, res) => {
    const { title, day, time } = req.body;
    if(req.query.idTeacher && req.query.idGroup){
        if(title || day || time){
            const data = await Teachers.findOneAndUpdate(
                {
                    _id: req.query.idTeacher,
                    "group._id": req.query.IdGroup   
                }, 
                {
                $set: {
                    "group.$": { ...req.body, _id: req.query.idGroup }
                }
            })
            if (data) {
                res.json({ title: 'Group updated', data })
            } else {
                res.json({ title: 'Xatolik' })
            }
        }
    }
}