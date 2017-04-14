var express = require('express');
var router = express.Router();
var User = require('../models/user')
var passport = require('../config/ppConfig')

function homepage (req, res) {
  res.render('index')
}

function showSignup (req, res) {
  res.render('auth/signup')
}

function createSignup(req, res) {
  User.create({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password
  }, function (err, createdUser) {
    if (err) {
      req.flash('error', 'Could not create user account')
      res.redirect('/auth/signup')
    } else {
      passport.authenticate('local' , {
        successRedirect: '/',
        successFlash: 'Account created and logged in'
      })(req,res)
    }
  })
}

function showLogin (req, res) {
  res.render('auth/login')
}

function authenticateLogin (req, res) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: 'Invalid username and/or password',
    successFlash: 'You have logged in'
  })(req, res)
}

function showProfile(req,res) {
  res.render('profile')
}

function logout (req, res) {
  req.logout()
  req.flash('success', 'You have logged out')
  res.redirect('/')
}


module.exports = {
  homepage,
  showSignup,
  createSignup,
  showLogin,
  authenticateLogin,
  showProfile,
  logout
}
