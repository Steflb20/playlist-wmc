"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePlaylistState = exports.addSongToDatabase = exports.init = void 0;
const mongoose = __importStar(require("mongoose"));
const Song_db_model_1 = require("../models/Song.db.model");
const songs_json_1 = __importDefault(require("../../mock/songs.json"));
const uuid_1 = require("uuid");
const DB_URL = 'mongodb://localhost:27017/playlist';
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose.connect(DB_URL);
        yield Song_db_model_1.SongModel.deleteMany();
        const newSongs = songs_json_1.default.map(s => {
            return {
                title: s.title,
                artist: s.artist,
                inPlaylist: s.inPlaylist,
                duration: s.duration,
                uuid: (0, uuid_1.v4)()
            };
        });
        yield Song_db_model_1.SongModel.insertMany(newSongs);
    });
}
exports.init = init;
function addSongToDatabase(song) {
    return __awaiter(this, void 0, void 0, function* () {
        const newSong = yield Song_db_model_1.SongModel.create(Object.assign(Object.assign({}, song), { uuid: (0, uuid_1.v4)() }));
        yield newSong.save();
    });
}
exports.addSongToDatabase = addSongToDatabase;
function updatePlaylistState(song) {
    return __awaiter(this, void 0, void 0, function* () {
        const filter = {
            title: song.title,
            artist: song.artist
        };
        const update = {
            inPlaylist: !song.inPlaylist
        };
        yield Song_db_model_1.SongModel.findOneAndUpdate(filter, update);
    });
}
exports.updatePlaylistState = updatePlaylistState;
module.exports = {
    init, addSongToDatabase, updatePlaylistState
};
