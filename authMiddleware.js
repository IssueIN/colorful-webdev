function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()){
    return next()
  }
  res.redirect('user/login')
}

function checkNotAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return res.redirect('/user')
  }
  next()
}

function checkAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.role === 'admin') {
      return next();
    } else {
      return res.render('user/index', {
        errorMessage:"You are not Admin",
        name: req.user.username
      });
    }
  } else {
    return res.redirect('/user/login');
  }
}


module.exports = {
  checkAuthenticated,
  checkNotAuthenticated,
  checkAdmin
};