import bcrypt from 'bcrypt';
import { userGames, userGameBiodata } from '../models';
import editProfileValidation from '../middlewares/validation/editProfileValidation';
import changePasswordValidation from '../middlewares/validation/changePasswordValidation';
import checkUserId from '../middlewares/authentication/checkUserId';
class userController {
  static getProfile = async (req, res) => {
    const login = checkUserId(req.session);
    try {
      const data = await userGameBiodata.findOne({
        attributes: ['name', 'gender', 'dob', 'status'],
        where: { userId: req.session.userId },
        include: [
          {
            model: userGames,
            attributes: ['userId', 'username', 'email'],
          },
        ],
      })
        .catch((e) => console.log(e));
      return res.render('profile', {
        title: req.session.username, login, data, username: req.session.username,
      });
    } catch {
      return res.render('profile', { title: 'Profile', login, username: req.session.username || '' });
    }
  };
  static getEditProfile = async (req, res) => {
    const login = checkUserId(req.session);
    return res.render('editProfile', {
      title: 'Edit Profile', login, username: req.session.username || '', validateError: '',
    });
  };
  static getChangePassword = (req, res) => {
    const login = checkUserId(req.session);
    return res.render('changePassword', {
      title: 'Change Password', login, username: req.session.username || '', validateError: '',
    });
  };
  static patchEditProfile = async (req, res) => {
    const login = checkUserId(req.session);
    try {
      const { name, status, gender } = req.body;
      let { dob } = req.body;
      const { error } = await editProfileValidation.validate({
        name,
        gender,
        dob,
        status,
      });
      if (error) {
        return res.render('editProfile', {
          title: 'Edit Profile', login, username: req.session.username || '', validateError: `${error.details[0].message}`,
        });
      }
      if (!dob) dob = null;
      await userGameBiodata.findOne({
        where: { userId: req.session.userId },
      })
        .then((user) => {
          if (name) { user.update({ name }); }
          if (gender) { user.update({ gender }); }
          if (dob) { user.update({ dob }); }
          if (status) { user.update({ status }); }
        })
        .catch((e) => console.log(e));
      return res.redirect('/profile');
    } catch {
      return res.redirect('/profile/edit', { login: false });
    }
  };
  static patchChangePassword = async (req, res) => {
    const login = checkUserId(req.session);
    try {
      const { oldPassword, password, repeatPassword } = req.body;
      const { error } = await changePasswordValidation.validate({
        oldPassword,
        password,
        repeatPassword,
      });
      if (error) {
        return res.render('changePassword', {
          title: 'Change Password', login, username: req.session.username || '', validateError: `${error.details[0].message}`,
        });
      }
      if (oldPassword === password) {
        return res.render('changePassword', {
          title: 'Change Password', login, username: req.session.username || '', validateError: 'New password should not be the same as old password.',
        });
      }
      const user = await userGames.findOne({
        where: { userId: req.session.userId },
      });
      const validPassword = await bcrypt.compare(oldPassword, user.password) || oldPassword === user.password;
      if (!validPassword) {
        return res.render('changePassword', {
          title: 'Change Password', login, username: req.session.username || '', validateError: 'Password is wrong',
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      if (validPassword && password) { await user.update({ password: hashedPassword }); }
      return res.redirect('/profile');
    } catch {
      return res.redirect('/profile/changePassword', { login: false });
    }
  };
}
export default userController;
