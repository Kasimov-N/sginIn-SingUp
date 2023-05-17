exports.checkLogin = async(req, res, next)=> {
    const {login, password} = req.body;
    if(login && password){
        next()
    }else{
        res.json({title: 'Pasword  or login not found'} )
    }
}