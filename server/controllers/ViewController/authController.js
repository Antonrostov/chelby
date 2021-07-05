import fetch from 'node-fetch';
import checkUserId from '../../middlewares/authentication/checkUserId';
class authController {
  static getSignup = (req, res) => {
    const login = checkUserId(req.session);
    res.render('signup', { title: 'Sign Up', login, validateError: '' });
  };
  static postSignup = async (req, res) => {
    const login = checkUserId(req.session);
    await fetch(`http:
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          return res.redirect('/auth/login');
        }
        return res.render('signup', { title: 'signup', login, validateError: data.message });
      })
      .catch((e) => console.log(e));
  };
  static getLogin = (req, res) => {
    const login = checkUserId(req.session);
    return res.render('login', { title: 'Login', login, validateError: '' });
  };
  static postLogin = async (req, res) => {
    const login = checkUserId(req.session);
    await fetch(`http:
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          if (data.userId && data.username) {
            req.session.userId = data.userId;
            req.session.username = data.username;
          }
          return res.render('index', { title: 'Home', login: true, username: req.session.username });
        }
        return res.render('login', { title: 'login', login, validateError: data.message });
      })
      .catch((e) => console.log(e));
  };
  static logout = async (req, res) => {
    await fetch(`http:
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 302) {
          req.session.destroy();
          res.clearCookie(process.env.SESSION_NAME);
          return res.render('login', { title: 'Login', login: false, validateError: '' });
        }
        return res.redirect('/profile');
      })
      .catch((e) => console.log(e));
  }
}
export default authController;
