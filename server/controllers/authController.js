import bcrypt from 'bcrypt';
import { userGames, userGameBiodata } from '../models';
import signupValidation from '../middlewares/validation/signupValidation';
import loginValidation from '../middlewares/validation/loginValidation';
class authController {
  static getSignup = (req, res) => {
    res.render('signup', { title: 'Sign Up', validateError: '' });
  };
  static postSignup = async (req, res) => {
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
      if (error) return res.render('signup', { title: 'Sign Up', validateError: `${error.details[0].message}` });
      const emailExist = await userGames.findOne({ where: { email } });
      if (emailExist) return res.render('signup', { title: 'Sign Up', validateError: 'Email is already signed up.' });
      const usernameExist = await userGames.findOne({ where: { username } });
      if (usernameExist) return res.render('signup', { title: 'Sign Up', validateError: 'Username is already taken.' });
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
      return res.redirect('/auth/signup');
    }
  };
  static getLogin = (req, res) => {
    res.render('login', { title: 'Login', validateError: '' });
  };
  static postLogin = async (req, res) => {
    try {
      const { username, password } = req.body;
      const { error } = await loginValidation.validate({ username, password });
      if (error) return res.render('login', { title: 'Login', validateError: `${error.details[0].message}` });
      const validUsername = await userGames.findOne({ where: { username } });
      if (!validUsername) return res.render('login', { title: 'Login', validateError: 'Username is wrong.' });
      const validPassword = await bcrypt.compare(password, validUsername.password) || validUsername.password;
      if (!validPassword) return res.render('login', { title: 'Login', validateError: 'Password is wrong.' });
      return res.redirect('/');
    } catch {
      return res.redirect('/auth/login');
    }
  };
}
export default authController;
