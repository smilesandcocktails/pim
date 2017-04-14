const express = require('express')
const router = express.Router()
const auth = require('../controllers/auth')
var passport = require('../config/ppConfig')
var isLoggedIn = require('../middleware/isLoggedIn')
// router.use(isLoggedIn)

router.route('/')
.get(auth.homepage)

router.route('/signup')
.get(auth.showSignup)
.post(auth.createSignup)

router.route('/login')
.get(auth.showLogin)
.post(auth.authenticateLogin)

router.route('/profile')
.get(auth.showProfile)
.get(isLoggedIn, function(req, res) {
  res.render('profile')
})

router.route('/logout')
.get(auth.logout)

// router.route('/fblogin/callback')
// .get(passport.authenticate('facebook', {scope:'email'}))


module.exports = router
