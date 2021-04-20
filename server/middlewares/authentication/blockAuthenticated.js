const blockAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    res.render('index', { title: 'Home', login: true, username: req.session.username || '' });
  } else next();
};
export default blockAuthenticated;
