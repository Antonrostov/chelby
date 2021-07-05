import bcrypt from 'bcrypt';
import { userGames, userGameBiodata } from '../../models';
class authController {
  static postSignup = async (req, res) => {
    try {
      const { email, username } = req.body;
      const emailExist = await userGames.findOne({ where: { email } });
      if (emailExist) return res.status(409).json({ status: 409, message: 'Email is already taken.' });
      const usernameExist = await userGames.findOne({ where: { username } });
      if (usernameExist) return res.status(409).json({ status: 409, message: 'Username is already taken.' });
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
        .then((user) => res.status(201).json({ status: 201, message: 'Added new user.', user }))
        .catch((e) => console.log(e));
      return res.status(201);
    } catch {
      return res.status(400).json({ status: 400, message: 'Failed to signup.' });
    }
  };
  static postLogin = async (req, res) => {
    try {
      const { username, password } = req.body;
      const validUser = await userGames.findOne({ where: { username } });
      if (!validUser) return res.status(400).json({ status: 400, message: 'Username is wrong.' });
      const validPassword = await bcrypt.compare(password, validUser.password);
      if (!validPassword) return res.status(400).json({ status: 400, message: 'Password is wrong.' });
      return res.status(200).json({
        status: 200, message: `User ${validUser.username} login.`, userId: validUser.userId, username: validUser.username,
      });
    } catch {
      return res.status(400).json({ status: 400, message: 'Failed to login.' });
    }
  };
  static logout = (req, res) => res.status(302).json({ status: 302, message: 'Session and cookies will be deleted.' })
}
export default authController;
