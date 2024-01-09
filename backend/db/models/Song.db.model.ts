import * as mongoose from "mongoose";

const songSchema = new mongoose.Schema<ISong>({
    uuid: { type: String, required: true },
    title: { type: String, required: true },
    inPlaylist: { type: Boolean, required: true },
    duration: { type: [Number], required: true },
    artist: { type: String, required: true }
});


export const SongModel = mongoose.model("Song", songSchema);