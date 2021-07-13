import bcrypt from 'bcrypt';
import { userGames, userGameBiodata } from '../../models';
class userController {
  static getProfile = async (req, res) => {
    try {
      await userGameBiodata.findOne({
        attributes: ['name', 'gender', 'dob', 'status'],
        where: { userId: req.params.id },
        include: [
          {
            model: userGames,
            attributes: ['userId', 'username', 'email'],
          },
        ],
      }).then((profile) => res.status(200).json({ status: 200, message: 'Success', profile }))
        .catch((e) => console.log(e));
      return res.status(200);
    } catch {
      return res.status(403).json({ status: 403, message: 'Forbidden' });
    }
  };
  static patchEditProfile = async (req, res) => {
    try {
      const { name, status, gender } = req.body;
      let { dob } = req.body;
      if (!dob) dob = null;
      await userGameBiodata.findOne({
        where: { userId: req.params.id },
      })
        .then((user) => {
          if (name) { user.update({ name }); }
          if (gender) { user.update({ gender }); }
          if (dob) { user.update({ dob }); }
          if (status) { user.update({ status }); }
        })
        .then((profile) => res.status(201).json({ status: 201, message: `Profile ${req.params.id} edited`, profile }))
        .catch((e) => console.log(e));
      return res.status(201);
    } catch {
      return res.status(403).json({ status: 403, message: 'Failed to edit profile.' });
    }
  };
  static patchChangePassword = async (req, res) => {
    try {
      const { oldPassword, password } = req.body;
      if (oldPassword === password) {
        return res.status(403).json({ status: 403, message: 'New password should not be the same as old password.' });
      }
      const user = await userGames.findOne({
        where: { userId: req.params.id },
      });
      const validPassword = await bcrypt.compare(oldPassword, user.password);
      if (!validPassword) {
        return res.status(403).json({ status: 403, message: 'Password is wrong.' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      if (validPassword && password) {
        await user.update({ password: hashedPassword })
          .then(() => res.status(200).json({ status: 200, message: 'Password changed.' }))
          .catch((e) => console.log(e));
      }
      return res.status(200);
    } catch {
      return res.status(403).json({ status: 403, message: 'Failed to change password' });
    }
  };
  static deleteUser = async (req, res) => {
    try {
      await userGames.destroy({ where: { userId: req.params.id } })
        .then(() => res.status(302).json({ status: 302, message: `User ${req.params.id} data deleted.` }))
        .catch((e) => console.log(e));
      return res.status(302);
    } catch {
      return res.status(403).json({ status: 403, message: 'Failed to delete user data.' });
    }
  };
}
export default userController;
