const express =require('express')
const expresslayout = require('express-ejs-layouts')
const mongoose = require('mongoose')
const mongodb = require('mongodb')
const bodyParser = require('body-parser')
const session = require('express-session')
var flash = require('connect-flash')
const passport=require('passport')


//mongo
mongoose.connect('mongodb://localhost:27017/registeredUsers', {useUnifiedTopology: true,useNewUrlParser: true}).then(()=>
    console.log("COnnected")

).catch(err=>console.log("EROR"))


const app = express()

require('./config/passport')(passport)




 const PORT = process.env.PORT || 5000

//layout

app.use(expresslayout)
app.set('view engine','ejs')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//session

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,

  }))

  app.use(passport.initialize());
app.use(passport.session());

  app.use(flash())

  app.use((req,res,next)=>{
      res.locals.success_msg=req.flash('success_msg')
      res.locals.error_msg=req.flash('error_msg')
      res.locals.error_l=req.flash('error')
      res.locals.error_p=req.flash('error')
    //   res.locals.error_login=req.flash('error_login')
    //   res.locals.error_pass=req.flash('error_pass')
      next()
  })

app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))



 
// parse application/json








 app.listen(PORT,console.log(`Connected at ${PORT}`))
 