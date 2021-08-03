import fetch from 'node-fetch';
class gameController {
  static getRoom = (req, res) => res.render('rockpaperscissor', { title: 'Rock Paper Scissor', username: req.cookies.username });
  static getGameHistory = async (req, res) => {
    await fetch(`http:
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          return res.render('game_history', { title: 'Game History', username: req.cookies.username, history: data.history });
        }
        return res.render('game_history', { title: 'Game History', username: req.cookies.username, history: '' });
      })
      .catch((e) => console.log(e));
  };
  static postGameHistory = async (req, res) => {
    await fetch(`http:
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          return res.redirect('/game');
        }
        return res.redirect('/');
      })
      .catch((e) => console.log(e));
  };
  static deleteGameHistory = async (req, res) => {
    await fetch(`http:
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          return res.redirect('/game/history');
        }
        return res.redirect('/game');
      })
      .catch((e) => console.log(e));
  };
}
export default gameController;
