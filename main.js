const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();
const cors = require('cors');


mongoose.connect(process.env.DB_local_link)
.then(data=>{
    if(data){
        console.log('Connected to DB')
    }else{
        throw new Error({title: 'Error'});
    }
})
.catch(err => {
    console.log(err)
})

//Configration
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//routes 
app.use('/', require('./routes/index'))
app.use('/admin', require('./routes/index'))
app.use('/admin/teachers', require('./routes/teachers'))
app.use('/admin/students', require('./routes/students'))
app.use('/admin/groups', require('./routes/groups'))
app.use('/Teacher', require('./routes/teacherRoute'))


//PORT
const PORT = process.env.PORT || 3000 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
