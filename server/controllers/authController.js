import bcrypt from 'bcrypt';
import { userGames, userGameBiodata } from '../models';
import signupValidation from '../middlewares/validation/signupValidation';
import loginValidation from '../middlewares/validation/loginValidation';
import checkUserId from '../middlewares/authentication/checkUserId';
class authController {
  static getSignup = (req, res) => {
    const login = checkUserId(req.session);
    res.render('signup', { title: 'Sign Up', login, validateError: '' });
  };
  static postSignup = async (req, res) => {
    const login = checkUserId(req.session);
    try {
      const {
        name, email, username, password, repeatPassword,
      } = req.body;
      const { error } = await signupValidation.validate({
        name,
        email,
        username,
        password,
        repeatPassword,
      });
      if (error) return res.render('signup', { title: 'Sign Up', login, validateError: `${error.details[0].message}` });
      const emailExist = await userGames.findOne({ where: { email } });
      if (emailExist) return res.render('signup', { title: 'Sign Up', login, validateError: 'Email is already taken.' });
      const usernameExist = await userGames.findOne({ where: { username } });
      if (usernameExist) return res.render('signup', { title: 'Sign Up', login, validateError: 'Username is already taken.' });
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await userGames.create({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
      })
        .then((data) => userGameBiodata.create({
          userId: data.userId,
          name: req.body.name,
        }))
        .catch((e) => console.log(e));
      return res.redirect('/auth/login');
    } catch {
      return res.redirect('/auth/signup', { login });
    }
  };
  static getLogin = (req, res) => {
    const login = checkUserId(req.session);
    res.render('login', { title: 'Login', login, validateError: '' });
  };
  static postLogin = async (req, res) => {
    const login = checkUserId(req.session);
    try {
      const { username, password } = req.body;
      const { error } = await loginValidation.validate({ username, password });
      if (error) {
        return res.render('login', {
          title: 'Login', login, validateError: `${error.details[0].message}`,
        });
      }
      const validUsername = await userGames.findOne({ where: { username } });
      if (!validUsername) {
        return res.render('login', {
          title: 'Login', login, validateError: 'Username is wrong.',
        });
      }
      const validPassword = await bcrypt.compare(password, validUsername.password) || password === validUsername.password;
      if (!validPassword) {
        return res.render('login', {
          title: 'Login', login, validateError: 'Password is wrong.',
        });
      }
      if (validUsername) {
        req.session.userId = validUsername.userId;
        req.session.username = validUsername.username;
      }
      return res.render('index', { title: 'Home', login: true, username: req.session.username });
    } catch {
      return res.redirect('/auth/login');
    }
  };
  static logout = (req, res) => {
    const login = checkUserId(req.session);
    req.session.destroy((err) => {
      if (err) {
        return res.render('index', { title: 'Home', login, username: '' });
      }
      res.clearCookie(process.env.SESSION_NAME);
      return res.redirect('/auth/login');
    });
  }
}
export default authController;
