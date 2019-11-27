// Load the express module and store it in the variable express (Where do you think this comes from?)copy
var express = require("express");
var bodyParser = require('body-parser')

var app = express();
var session = require('express-session')
app.set('trust proxy', 1)
app.use(session({
    secret: 'I solemly swear I am upto no good',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))
var database = require('./server/config/mongoose.js')



//SEEDING DB WITH 1 USER IF NEEDED
/* var User = mongoose.model('User');
    User.find({}, function(err, users){
    if (err){
        console.log("errors: ",err)
    }else{
        if (users.length == 0){
            let example = new User()
            example.first_name = 'Chris'
            example.last_name = 'Thompson'
            example.email = 'chrisincr@gmail.com'
            example.birthday = '10/23/1983'

            let pass = 'asdfasdf'
            
            createUser(example, pass,{})
        }
    }
}) */



app.use(express.static(__dirname + "/public/dist/public/"));
app.use(bodyParser.urlencoded({extended : true}));

const server = app.listen(8000, function() {
    console.log("listening on port 8000");
})

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); 

var messages=[]

require('./server/config/routes.js')(app)