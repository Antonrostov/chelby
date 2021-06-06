import { userGameHistories } from '../../models';
import fetch from 'node-fetch'
class gameController {
  static rpsIndex = (req, res) => {
    res.render('rockpaperscissor', { title: 'Rock Paper Scissor', username: req.session.username });
  };
  static getGameHistory = async (req, res) => {
    await fetch(`http:
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          return res.render('game_history', { title: 'Game History', username: req.session.username, history: data.history });
        } else {
          return res.render('game_history', { title: 'Game History', username: req.session.username, history: '' });
        }
      })
      .catch((e) => console.log(e));
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
export default gameController;
