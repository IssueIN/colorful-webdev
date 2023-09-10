function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()){
    return next()
  }
  res.redirect('/internal/login')
}

function checkNotAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return res.redirect('/internal')
  }
  next()
}

function checkAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.type === 'admin') {
      return next();
    } else {
      return res.render('internal/index', {
        errorMessage:"You are not Admin",
        name: req.user.username
      });
    }
  } else {
    return res.redirect('/internal/login');
  }
}


module.exports = {
  checkAuthenticated,
  checkNotAuthenticated,
  checkAdmin
};