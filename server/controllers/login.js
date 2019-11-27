var bcrypt = require("bcrypt")
var session = require('express-session')
const mongoose = require('mongoose'),
    User = mongoose.model('User')

module.exports = {
    login: function(req,res){
        console.log('req.body:',req.body)
        User.findOne({email: req.body['email']})
        .then(user => {
            console.log('user',user)
            console.log('login requested by: {','email ',req.body.email,'pass ',req.body.password,'}')
            bcrypt.compare(req.body.password,user.password)
            .then(status=>{
                console.log('password match',status)

                if(status){
                    session.email = user.email
                    res.redirect('/success')
                }
                else{
                    req.session.destroy()
                    res.redirect('/express')
                }
            })
            .catch(err=>{
                console.log('password login error',err)
                res.redirect('/express')
            })

        })
        .catch(err => {
            console.log('error finding user:',err)
            res.redirect('/express')
        })
        
    }
}