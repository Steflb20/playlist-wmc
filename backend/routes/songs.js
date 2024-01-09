"use strict";
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
const express_1 = __importDefault(require("express"));
const Song_db_model_1 = require("../db/models/Song.db.model");
const Database_service_1 = require("../db/services/Database.service");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    Song_db_model_1.SongModel.find()
        .then(songs => res.json(songs));
});
router.get('/playlist-songs', (req, res) => {
    Song_db_model_1.SongModel.find({
        inPlaylist: true
    })
        .then(songs => res.json(songs));
});
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songBody = req.body;
    yield (0, Database_service_1.addSongToDatabase)(songBody);
    res.json(songBody);
}));
router.put('/playlist', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songBody = req.body;
    yield (0, Database_service_1.updatePlaylistState)(songBody);
    songBody.inPlaylist = !songBody.inPlaylist;
    res.json(songBody);
}));
module.exports = router;
