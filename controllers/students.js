const Students = require("../models/Students")
const Teachers = require("../models/Teachers")

exports.index = async (req, res) => {
    const data = await Students.find({})
    if (data) {
        res.json({
            title: 'All students',
            length: data.length,
            data: data
        })
    }
}
exports.show = async (req, res) => {
    const data = await Students.findById(req.params.id)
    if (data) {
        res.json({
            title: 'Special student',
            data: data
        })
    }
}
exports.create = (req, res) => {
    let { firstName, lastName, email, phoneNumber, ParentsPhoneNumber, password } = req.body
    if (firstName && lastName && email && phoneNumber || ParentsPhoneNumber && password) {
        let student = new Students({
            firstName,
            lastName,
            email,
            phoneNumber,
            ParentsPhoneNumber,
            password
        })
        student.save()
            .then(data => {
                res.json({
                    title: 'Student created',
                    data: data
                })
            })
    } else {
        res.json('Malumot toliq emas')
    }
}
exports.remove = async (req, res) => {
    const data = await Students.findByIdAndDelete(req.params.id)
    if (data) {
        res.json({
            title: 'Student Deleted'
        })
    }
}
exports.edit = async (req, res) => {
    let { firstName, lastName, email, phoneNumber, ParentsPhoneNumber, password } = req.body
    if (firstName || lastName || email || phoneNumber || ParentsPhoneNumber || password) {
        const data = await Students.findByIdAndUpdate(req.params.id, req.body)
        if (data) {
            res.json({
                title: 'Student edited',
                data: data
            })
        }
    } else {
        res.json('Malumot yoq')
    }
}

exports.addStudentToGroup = async (req, res) => {
    let { idTeacher, IdGroup, idStudent } = req.body
    if (idTeacher && IdGroup && idStudent) {
        let teacher = await Teachers.findById(idTeacher)
        if (!teacher) {
            res.json({ title: "Teacher not found" })
        } else {
            const student = await Teachers.findById(idTeacher, { group: { $elemMatch: { _id: IdGroup } } })
            const qwe = student.group[0].students.filter(elem => elem == idStudent)
            if (qwe.length > 0) {
                res.json({ title: "Bunday oquvchi allaqachon mavjud" })

            } else {
                let group = await Teachers.findOneAndUpdate(
                    {
                        _id: idTeacher,
                        "group._id": IdGroup
                    },
                    {
                        $push: {
                            "group.$.students": idStudent
                        }
                    })

                res.json({ title: "Success", group })

            }
        }
    } else {
        res.json({ title: "Data is not defined" })
    }

}

exports.removeStudentFromGroup = async (req, res) => {
    let { idTeacher, IdGroup, idStudent } = req.body
    if (idTeacher && IdGroup && idStudent) {
        let teacher = await Teachers.findById(idTeacher)
        if (!teacher) {
            res.json({ title: "Teacher not found" })
        } else {
            let group = await Teachers.findOneAndUpdate(
                {
                    _id: idTeacher,
                    "group._id": IdGroup
                },
                {
                    $pull: {
                        "group.$.students": idStudent
                    }
                })

            res.json({ title: "Success", group })

        }


    } else {
        res.json({ title: "Data is not defined" })
    }


}