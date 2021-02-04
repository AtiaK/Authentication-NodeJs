const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const connectionModel=require('../models/connectionSaved')
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));


//login
router.post('/login',async (req,res,next)=>{
  const user=await User.findOne({username:req.body.username})
  if(user){
      if(user.password===req.body.password){
        req.session.theUser=user
      }
  }
  if(req.session.theUser){
    const connection=await connectionModel.findOne({ userId: user._id })
    if(connection){
      req.session.currentProfile=connection
    }else{
      req.session.currentProfile='empty'
    }
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
} 
  
})

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
