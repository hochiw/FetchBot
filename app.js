const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')

var app = express()



app.engine('hbs',hbs({
    extname: 'hbs',
    defaultLayout:'layout',
    layoutsDir: __dirname + '/layouts'
}))

app.set('views',path.join(__dirname,'views'))
app.set('view engine','hbs')

var router = require('./router.js');

app.use('/',router);
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


const PORT = 4000 || process.env.PORT
var server = app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})
