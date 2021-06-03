import { userGameHistories } from '../../models';
class GameHistoryAPIController {
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
export default GameHistoryAPIController;
