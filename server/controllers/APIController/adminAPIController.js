import { userGames, userRoles } from '../../models';
class adminAPIController {
  static getUserlist = async (req, res) => {
    try {
      await userGames.findAll({
        attributes: ['userId', 'username', 'roleRank'],
        order: [['roleRank', 'ASC'], ['username', 'ASC']],
        include: [
          {
            model: userRoles,
            attributes: ['role'],
          },
        ],
      }).then((users) => res.status(200).json({ status: 200, message: 'Success', users }))
        .catch((e) => console.log(e));
      return res.status(200);
    } catch {
      return res.status(403).json({ status: 403, message: 'Forbidden.' });
    }
  };
  static promoteAdmin = async (req, res) => {
    try {
      const { userId } = req.body;
      await userGames.findOne({
        where: { userId },
      })
        .then((user) => {
          if (userId) { user.decrement('roleRank', { by: 1 }); }
        })
        .then(() => res.redirect('/admin/userlist'))
        .catch((e) => console.log(e));
      return res.status(201);
    } catch {
      return res.status(403);
    }
  };
  static demoteAdmin = async (req, res) => {
    try {
      const { userId } = req.body;
      await userGames.findOne({
        where: { userId },
      })
        .then((user) => {
          if (userId) { user.increment('roleRank', { by: 1 }); }
        })
        .then(() => res.redirect('/admin/userlist'))
        .catch((e) => console.log(e));
      return res.status(201);
    } catch {
      return res.status(403);
    }
  };
}
export default adminAPIController;
