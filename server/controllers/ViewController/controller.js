import jwtAuth from '../../middlewares/authentication/jwtAuth';
class Controller {
  static index = (req, res) => {
    if (req.decoded) return res.render('index', { title: 'Home', login: true, username: req.decoded.username });
    return res.render('index', { title: 'Home', login: false, username: '' });
  };
  static pageNotFound = (req, res) => {
    if (req.cookies.access_token) {
      const token = req.cookies.access_token.split(' ')[1];
      return jwtAuth.verify(
        token,
        (decoded) => {
          req.decoded = decoded;
          return res.status(404).render('404', { title: '404', login: true, username: req.decoded.username });
        },
        () => res.redirect('/'),
      );
    }
    return res.status(404).render('404', { title: '404', login: false, username: '' });
  }
}
export default Controller;
