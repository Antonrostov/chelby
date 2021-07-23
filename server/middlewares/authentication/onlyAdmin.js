import { userGames } from '../../models';
const onlyAdmin = async (req, res, next) => {
  try {
    await userGames.findOne({
      where: { userId: req.decoded.userId },
    }).then((user) => {
      if (user.isAdmin) return next();
      return res.redirect('/');
    }).catch((e) => console.log(e));
  } catch {
    return res.status(403).json({ message: 'Forbidden.' });
  }
};
export default onlyAdmin;
