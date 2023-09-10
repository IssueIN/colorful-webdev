const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const { checkAuthenticated, checkNotAuthenticated, checkAdmin} = require('../authMiddleware');

router.get('/', checkAuthenticated, (req, res) => {
  res.render('user/index.ejs', {
    name: req.user.username,
    role: req.user.role
  });
})

router.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('user/login.ejs')
})

router.post('/login',checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/user/login',
  failureFlash: true,
}))

router.get('/register', checkAdmin, (req, res) => {
  const userRoles = User.schema.path('role').enumValues;
  const user = new User();
  res.render('user/register.ejs', {
    user: user,
    roles: userRoles
  })
})

router.post('/register', checkAdmin, async (req, res) => {
  const user = new User({
    username: req.body.username,
    role: req.body.role
  })
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
    const newUser = await user.save();
    res.redirect('/user/login')
  } catch {
    res.redirect('/user/register');
  }
})

router.delete('/logout', (req, res, next) => {
  req.logOut((err) => {
    if(err) {return next(err)}
    return res.redirect('/user')
  });
})

module.exports = router;