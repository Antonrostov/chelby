const blockUnauthenticated = (req, res, next) => {
  if (!req.session.userId) {
    res.render('login', { title: 'Login', login: false, validateError: '' });
  } else next();
};
export default blockUnauthenticated;
