const {model, Schema} = require('mongoose')

module.exports = model('student', new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: Number,
    ParentsPhoneNumber: {
        mother: Number,
        father: Number
    },
    password: String,
    totalScore: String,
    attendance: [
        {
            status: Boolean,
            date: Date,
            reason: String,
            score: Number
        }
    ]
},  { timestamps: true }))