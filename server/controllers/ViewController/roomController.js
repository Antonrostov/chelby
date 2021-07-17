import { room, userGames } from '../../models';
class RoomController {
    static getRoom = async (req, res) => {
      try {
        const room = await room.findAll();
        return res.status(200).json(room);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    static createRoom = async (req, res) => {
      try {
        const room = await room.createRoom();
        return res.status(200).json({ message: 'Success create room' });
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    static joinRoom = async (req, res) => {
      try {
        const { id, username } = req.body;
        const findRoom = await room.findOne({ where: { id } });
        console.log(findRoom.userId1);
        if (!findRoom) {
          return res.status(404).send({ message: 'Room not found' });
        }
        const findUser = await userGames.findOne({ where: { username } });
        if (!findUser) {
          res.status(404).json({ message: 'User not found' });
        }
        if (findRoom.userId1 && findRoom.userId2) {
          return res.status(400).json({ message: 'Room Full' });
        }
        if (findRoom.userId1 === null) {
          const updateRoom = await room.update(
            {
              userId1: id,
            },
            { where: { id } },
          );
          return res.status(200).json({ message: `succes joining to room ${id} as player 1` });
        }
        if (findRoom.userId2 === null) {
          const updateRoom = await room.update(
            {
              userId2: id,
            },
            { where: { id } },
          );
          return res.status(200).send({ message: `succes joining to room ${id} as player 2` });
        }
        return res.status(200).json({ message: `Succes joining to room ${id}` });
      } catch (err) {
        res.status(500).send(err);
      }
    }
}
export default RoomController;
