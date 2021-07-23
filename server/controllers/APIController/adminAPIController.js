import { userGames } from '../../models';
class adminAPIController {
  static getUserlist = async (req, res) => {
    try {
      await userGames.findAll({
        attributes: ['userId', 'username', 'isAdmin'],
        order: [['username', 'ASC']],
      }).then((users) => res.status(200).json({ status: 200, message: 'Success', users }))
        .catch((e) => console.log(e));
      return res.status(200);
    } catch {
      return res.status(403).json({ status: 403, message: 'Forbidden.' });
    }
  };
}
export default adminAPIController;
