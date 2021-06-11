import { userGameHistories } from '../../models';
class gameAPIController {
  static getGameHistory = async (req, res) => {
    try {
      await userGameHistories.findAll({
        attributes: ['historyId', 'timestamps', 'player_choice', 'comp_choice', 'result'],
        where: { userId: req.params.id },
        order: [['timestamps', 'DESC']],
      }).then((history) => res.status(200).json({ status: 200, message: 'success', history }))
        .catch((e) => console.log(e));
      return res.status(200);
    } catch {
      return res.status(403).json({ status: 403, message: 'forbidden' });
    }
  };
  static postGameHistory = async (req, res) => {
    try {
      const { player_choice, comp_choice, result } = req.body;
      await userGameHistories.create({
        timestamps: new Date().toISOString(),
        userId: req.session.userId,
        player_choice,
        comp_choice,
        result,
      }).catch((e) => console.log(e));
      return res.status(201);
    } catch {
      return res.redirect('/game');
    }
  };
  static deleteGameHistory = async (req, res) => {
    try {
      const { historyId } = req.body;
      await userGameHistories.destroy({ where: { historyId } })
        .catch((e) => console.log(e));
      return res.redirect('/game/history');
    } catch {
      return res.redirect('/game');
    }
  };
}
export default gameAPIController;
