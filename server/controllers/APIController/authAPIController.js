import bcrypt from 'bcrypt';
import auth from '../../middlewares/authentication';
import { userGames, userGameBiodata } from '../../models';
class authController {
  static postSignup = async (req, res) => {
    try {
      const {
        name, email, username, password,
      } = req.body;
      const emailExist = await userGames.findOne({ where: { email } });
      if (emailExist) return res.status(409).json({ message: 'Email is already taken.' });
      const usernameExist = await userGames.findOne({ where: { username } });
      if (usernameExist) return res.status(409).json({ message: 'Username is already taken.' });
      const hashedPassword = await bcrypt.hash(password, 10);
      await userGames.create({
        email,
        username,
        password: hashedPassword,
      })
        .then((data) => userGameBiodata.create({
          userId: data.userId,
          name,
        }))
        .then((user) => res.status(201).json({ status: 201, message: `User ${user.userId} added.`, user }))
        .catch((e) => res.status(400).json({ message: 'Failed to signup.' }));
      return res.status(201);
    } catch {
      return res.status(400).json({ message: 'Failed to signup.' });
    }
  };
  static postLogin = async (req, res) => {
    try {
      const { username, password } = req.body;
      const validUser = await userGames.findOne({ where: { username } });
      if (!validUser) return res.status(401).json({ message: 'Username is wrong.' });
      const validPassword = await bcrypt.compare(password, validUser.password);
      if (!validPassword) return res.status(401).json({ message: 'Password is wrong.' });
      return auth.jwtAuth.sign(
        {
          userId: validUser.userId,
          username: validUser.username,
        },
        (token) => res.status(200).json({
          status: 200, message: `User ${validUser.username} login.`, userId: validUser.userId, username: validUser.username, token,
        }),
        () => res.status(500).json({ message: 'Internal Server Error.' }),
      );
    } catch {
      return res.status(401).json({ status: 401, message: 'Unathorized.' });
    }
  };
  static logout = (req, res) => res.status(302).json({ status: 302, message: 'Session and cookies will be deleted.' })
}
export default authController;
