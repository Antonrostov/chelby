import { userGameHistories, room, userGames } from '../../models';
import utils from '../../utils';
class gameAPIController {
  static getRoom = async (req, res) => {
    try {
      return await room.findAll({
        attributes: ['roomId', 'status'],
        order: [['status', 'ASC']],
      }).then((result) => res.status(200).json({ status: 200, message: 'success', result }))
        .catch((error) => res.status(400).json({ error: error.name }));
    } catch {
      return res.status(500).json({ status: 500, message: 'Server Internal Error.' });
    }
  }
  static createRoom = async (req, res) => {
    try {
      const roomCode = utils.randomizeString(6);
      return await room.create({ roomId: roomCode })
        .then((result) => res.status(201).json({ status: 201, message: result, roomCode }))
        .catch((error) => res.status(400).json({ error: error.name }));
    } catch {
      return res.status(500).json({ status: 500, message: 'Server Internal Error.' });
    }
  };
  static getRoomById = async (req, res) => {
    try {
      const { roomId } = req.params;
      const { username } = req.body;
      return await room.findOne({ where: { roomId } })
        .then((roomData) => {
          const requirement1 = !roomData.username1 && roomData.username1 !== username && roomData.username2 !== username;
          const requirement2 = !roomData.username2 && roomData.username2 !== username && roomData.username1 !== username;
          if (roomData.status !== 'full') {
            if (requirement1) {
              if (roomData.username2) {
                roomData.update({ username1: username, playerOne_status: 'waiting', status: 'full' })
                  .then((updated) => res.json({ status: 200, roomInfo: updated.dataValues }))
                  .catch((error) => res.status(400).json({ error: error.name }));
              } else {
                roomData.update({ username1: username, playerOne_status: 'waiting', status: 'waiting' })
                  .then((updated) => res.json({ status: 200, roomInfo: updated.dataValues }))
                  .catch((error) => res.status(400).json({ error: error.name }));
              }
            } else if (requirement2) {
              if (roomData.username1) {
                roomData.update({ username2: username, playerTwo_status: 'waiting', status: 'full' })
                  .then((updated) => res.json({ status: 200, roomInfo: updated.dataValues }))
                  .catch((error) => res.status(400).json({ error: error.name }));
              } else {
                roomData.update({ username2: username, playerTwo_status: 'waiting', status: 'waiting' })
                  .then((updated) => res.json({ status: 200, roomInfo: updated.dataValues }))
                  .catch((error) => res.status(400).json({ error: error.name }));
              }
            }
          } else {
            res.status(400).json({ message: `Room ${roomId} is full.` });
          }
        })
        .catch((error) => res.status(400).json({ error: error.name }));
    } catch {
      return res.status(500).json({ status: 500, message: 'Server Internal Error.' });
    }
  }
  static getGameHistory = async (req, res) => {
    try {
      return await userGameHistories.findAll({
        attributes: ['historyId', 'timestamps', 'player_choice', 'comp_choice', 'result'],
        where: { userId: req.params.id },
        order: [['timestamps', 'DESC']],
      }).then((history) => res.status(200).json({ status: 200, message: 'success', history }))
        .catch((error) => res.status(400).json({ error: error.name }));
    } catch {
      return res.status(500).json({ status: 500, message: 'Server Internal Error.' });
    }
  };
  static postGameHistory = async (req, res) => {
    try {
      const { player_choice, comp_choice, result } = req.body;
      if (player_choice && comp_choice && result) {
        return await userGameHistories.create({
          timestamps: new Date().toISOString(),
          userId: req.params.id,
          player_choice,
          comp_choice,
          result,
        })
          .then((history) => res.status(201).json({ status: 201, message: 'new history created', history }))
          .catch((error) => res.status(400).json({ error: error.name }));
      }
      return res.status(400).json({ status: 400, message: 'Bad Request.' });
    } catch {
      return res.status(500).json({ status: 500, message: 'Server Internal Error.' });
    }
  };
  static deleteGameHistory = async (req, res) => {
    try {
      const { historyId } = req.body;
      return await userGameHistories.destroy({ where: { historyId } })
        .then(() => res.status(200).json({ status: 200, message: `history ${historyId} deleted` }))
        .catch((error) => res.status(400).json({ error: error.name }));
    } catch {
      return res.status(500).json({ status: 500, message: 'Server Internal Error.' });
    }
  };
}
export default gameAPIController;
