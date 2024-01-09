import * as mongoose from "mongoose";
import {SongModel} from "../models/Song.db.model";
import songs from '../../mock/songs.json';
import { v4 as uuidv4 } from 'uuid';

const DB_URL = 'mongodb://localhost:27017/playlist';
export async function init(): Promise<void> {
    await mongoose.connect(DB_URL);
    await SongModel.deleteMany();

    const newSongs: ISong[] = songs.map(s => {
        return {
            title: s.title,
            artist: s.artist,
            inPlaylist: s.inPlaylist,
            duration: s.duration,
            uuid: uuidv4()
        };
    })

    await SongModel.insertMany(newSongs);
}
export async function addSongToDatabase(song: ISong): Promise<void> {
    const newSong: mongoose.Document = await SongModel.create({
        ...song,
        uuid: uuidv4()
    });
    await newSong.save();
}
export async function updatePlaylistState(song: ISong): Promise<void> {
    const filter = {
        title: song.title,
        artist: song.artist
    };
    const update = {
        inPlaylist: !song.inPlaylist
    };
    await SongModel.findOneAndUpdate(filter, update);
}

module.exports = {
        init, addSongToDatabase, updatePlaylistState
};