const {model, Schema} = require('mongoose')

module.exports = model('teacher', new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: Number,
    password: String,
    subject: String,
    group: [
        {
            title: String,
            day: {
                type: String,
                enum: ['toq','juft'],
                default: 'toq',
            },
            time: {
                type: String,
                required: true
            },
            students:{
                type: [Schema.Types.ObjectId],
                ref: 'student'
            }
        }
    ]
},  { timestamps: true }))