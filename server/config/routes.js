var session = require('express-session')
var register = require('../controllers/register.js')
var login = require('../controllers/login.js')

module.exports = function(app){
app.get('/express', function(request,response){
    response.render('index')
})


app.get('/', function(request,response){
    console.log('in get /')
})


app.get('/success', function(request,response){
    console.log('in get /success')
    if('email' in session){
        response.render('home')
    }else{
        response.redirect('/')
    }
})


app.post('/login', function(request, response){
    console.log('in post login')
    login.login(request,response)
    
})

app.post('/users', async function (request,response){
    console.log('in post users')
    register.create(request,response);
})

}
