import express, { Router, Request, Response } from "express";
import { SongModel } from "../db/models/Song.db.model";
import { addSongToDatabase, updatePlaylistState } from '../db/services/Database.service';

const router = express.Router();

router.get('/',  (req: Request, res: Response) => {
   SongModel.find()
       .then(songs => res.json(songs));
});

router.get('/playlist-songs',  (req: Request, res: Response) => {
   SongModel.find({
      inPlaylist: true
   })
       .then(songs => res.json(songs));
});

router.post('/', async (req: Request, res: Response) => {
   const songBody = req.body as ISong;
   await addSongToDatabase(songBody);
   res.json(songBody);
});

router.put('/playlist', async (req: Request, res: Response) => {
   const songBody = req.body as ISong;
   await updatePlaylistState(songBody);

   songBody.inPlaylist = !songBody.inPlaylist;

   res.json(songBody);
});

module.exports = router;