exports.createSession = function (req, res, newUser) {
  req.session.regenerate(function () {
    req.session.user = newUser
    // console.log("hello here",newUser)
    res.sendStatus(201)
  })
}

// check if the user is logged in
exports.isLoggedIn = function (req, res) {
  if (req.session) {
    return !!req.session.user
  }
  return false
}

// this is the middle ware we will call it before rendering the main page
exports.checkUser = (req, res, next) => {
  if (!exports.isLoggedIn(req)) {
    res.sendStatus(404)
  } else {
    next()
  }
}