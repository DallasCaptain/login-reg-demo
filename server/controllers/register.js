
var session = require('express-session')
const mongoose = require('mongoose'),
    User = mongoose.model('User')
    var bcrypt = require("bcrypt")
    //login handled during registration
    //const login = require('../controllers/login.js')
    
    
    
    

module.exports = {
    create: function(request,response){

        //create user and set attributes from reg form
        newUser = User()
        newUser.first_name = request.body.first_name
        newUser.last_name = request.body.last_name
        newUser.email = request.body.email
        newUser.birthday = request.body.birth_day

        //validate password and conf_password

        if(request.body.password == request.body.conf_password){

            //create hash then save user to db

            bcrypt.hash(request.body.password,10)
            .then(hash =>{
                newUser.password = hash
                newUser.save()
                .then(()=>{
                    session.email = newUser.email
                    response.redirect('/success')
                })
                .catch(err =>{
                    console.log('user save error:',err)
                    response.redirect('/')
                })
            })
            .catch(err =>{
                console.log('password hash error:', err)
                response.redirect('/')
            })
        }else{
            response.redirect('/')
        }
        }
}