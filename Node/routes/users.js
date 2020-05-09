const express = require('express')

const mongoose =require('mongoose')
const bcrypt = require('bcryptjs')

const User = require('../models/Users' )
const passport = require('passport')


const router= express.Router()






router.get('/',(req,res)=>res.send("You are"))

router.get('/login',(req,res)=>res.render("login"))

router.get('/register',(req,res)=>res.render("register"))


//error
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
  
    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }
  
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
  
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
  
    if (errors.length > 0) {
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2
      });

    }
    else{
User.findOne({email:email})
.then(user=>{
if(user){
  errors.push({msg:"User already registered"})
  res.render('register', {
    errors,
    name,
    email,
    password,
    password2
  });
}
else{
   const newUser = new User({
     name,
     email,
     password
   })

   bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then(user => {
          req.flash(
            'success_msg',
            'You are now registered and can log in'
          );
          res.redirect('/users/login');
        })
        .catch(err => console.log(err));
    });
  });
 
}



})//then


  
    }//else
})//post

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});


router.post('/logout', (req, res, next) => {
  req.logout()
  req.flash('success_msg','You are now Logged Out')
  req.redirect('users/login')

});
   

module.exports=router