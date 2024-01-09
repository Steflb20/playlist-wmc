import axios from "axios";

export class SongService {

    private static readonly BASE_URL = 'http://localhost:3000/songs';

    public static async getSong(): Promise<ISong[]> {
        const response = await axios.get<ISong[]>(this.BASE_URL);
        return response.data;
    }

    public static async getPlaylistSongs(): Promise<ISong[]> {
        const response = await axios.get<ISong[]>(this.BASE_URL + '/playlist-songs');
        return response.data;
    }

    public static async postSong(song: ISong): Promise<void> {
        await axios.post(this.BASE_URL, song);
    }

    public static async updateStateOfSong(song: ISong): Promise<ISong> {
        const response = await axios.put<ISong>(this.BASE_URL + '/playlist', song);
        return response.data;
    }

}