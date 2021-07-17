const blockAuthenticated = (req, res, next) => {
  if (req.cookies.access_token) {
    return res.redirect('/');
  } return next();
};
export default blockAuthenticated;
