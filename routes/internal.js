const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const InternalUser = require('../models/internalUser')
const passport = require('passport')
const { checkAuthenticated, checkNotAuthenticated, checkAdmin} = require('../authMiddleware');

router.get('/', checkAuthenticated, (req, res) => {
  res.render('internal/index.ejs', {
    name: req.user.username,
    type: req.user.type
  });
})

router.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('internal/login.ejs')
})

router.post('/login',checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/internal',
  failureRedirect: '/internal/login',
  failureFlash: true,
}))

router.get('/register', checkAdmin, (req, res) => {
  const internalUserTypes = InternalUser.schema.path('type').enumValues;
  const internalUser = new InternalUser();
  res.render('internal/register.ejs', {
    internalUser: internalUser,
    types: internalUserTypes
  })
})

router.post('/register', checkAdmin, async (req, res) => {
  const internalUser = new InternalUser({
    username: req.body.username,
    type: req.body.type
  })
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    internalUser.password = hashedPassword;
    const newInternalUser = await internalUser.save();
    res.redirect('/internal/login')
  } catch {
    res.redirect('/internal/register');
  }
})

router.delete('/logout', (req, res, next) => {
  req.logOut((err) => {
    if(err) {return next(err)}
    return res.redirect('/internal')
  });
})

module.exports = router;