import fetch from 'node-fetch';
import checkUserId from '../../middlewares/authentication/checkUserId';
class userController {
  static getProfile = async (req, res) => {
    const login = checkUserId(req.session);
    await fetch(`http:
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 403) {
          return res.render('changePassword', {
            title: 'Change Password', login, username: req.session.username || '', validateError: data.message,
          });
        }
        if (data.status === 200) {
          return res.render('profile', {
            title: req.session.username, login, user: data.profile, username: req.session.username,
          });
        }
        return res.render('profile', { title: 'Profile', login, username: req.session.username || '' });
      })
      .catch((e) => console.log(e));
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
    await fetch(`http:
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          return res.redirect('/profile');
        }
        return res.redirect('/profile/edit');
      })
      .catch((e) => console.log(e));
  };
  static patchChangePassword = async (req, res) => {
    const login = checkUserId(req.session);
    await fetch(`http:
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          return res.redirect('/profile');
        }
        return res.render('changePassword', {
          title: 'Change Password', login, username: req.params.username || '', validateError: data.message,
        });
      })
      .catch((e) => console.log(e));
  };
  static deleteUser = async (req, res) => {
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
  };
}
export default userController;
