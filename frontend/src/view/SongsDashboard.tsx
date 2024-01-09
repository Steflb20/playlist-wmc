import React, {useEffect, useState} from "react";
import {SongService} from "../common/services/Song.service";
import './View.css';
import {PlaylistAddCheck} from "@mui/icons-material";

export const SongsDashboard: React.FC = () => {

    const [songs, setSongs] = useState<ISong[]>([]);

    useEffect(() => {
        SongService.getSong().then(
            songs => setSongs(songs)
        );
    }, []);

    const onHandle = (song: ISong) => {
        SongService.updateStateOfSong(song).then(
            newSong => {
                const mappedSongs = songs.map(s => {
                    if (s.title === newSong.title &&
                        s.artist === newSong.artist
                    ) {
                        return newSong;
                    }

                    return s;
                })

                setSongs(mappedSongs);
            }
        )
    }

    return (
        <div>

            <h1>Songs</h1>

            <table className="song-table">
                <thead>
                    <tr>

                        <th>Title</th>
                        <th>Artist</th>
                        <th>Duration [mm:ss]</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { songs.map(song => {
                        return (
                            <tr key={song.uuid} >
                                <td>{song.title}</td>
                                <td>{song.artist}</td>
                                <td>{song.duration[0]}:{song.duration[1]}</td>
                                <td>{song.inPlaylist ? <PlaylistAddCheck color="primary" /> : <button onClick={() => onHandle(song)}>Add To Playlist</button>}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}