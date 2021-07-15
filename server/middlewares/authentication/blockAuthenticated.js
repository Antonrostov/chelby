const blockAuthenticated = (req, res, next) => {
  if (req.cookies.access_token) {
    return res.redirect('/');
  } else next();
};
export default blockAuthenticated;
