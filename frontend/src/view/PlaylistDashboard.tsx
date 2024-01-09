import React, {useEffect, useState} from "react";
import {SongService} from "../common/services/Song.service";

export const PlaylistDashboard: React.FC = () => {

    const [songs, setSongs] = useState<ISong[]>([]);

    const [totalDuration, setTotalDuration] = useState<number[]>([]);


    const calculateTotalDuration = (parsedSongs: ISong[]): number[] => {
        console.log(parsedSongs);
        let newTotalDuration = [0, 0];

        parsedSongs.forEach(s => {
            newTotalDuration[1] = newTotalDuration[1] + s.duration[1];
            newTotalDuration[0] = newTotalDuration[0] + s.duration[0];
        });

        let minutes = Math.floor(newTotalDuration[1] / 60) + newTotalDuration[0];
        let seconds = newTotalDuration[1] % 60;

        return [minutes, seconds];
    }


    useEffect(() => {
        SongService.getPlaylistSongs().then(songs => {
            setSongs(songs);
            setTotalDuration(calculateTotalDuration(songs));
        });
    }, []);


    function onHandle(song: ISong) {
        SongService.updateStateOfSong(song).then(
            newSong => {
                const mappedSongs = songs.map(s => {
                    if (s.title === newSong.title &&
                        s.artist === newSong.artist
                    ) {
                        return newSong;
                    }

                    return s;
                }).filter(s => s.inPlaylist);


                setSongs(mappedSongs);
                const newDuration = calculateTotalDuration(mappedSongs);
                setTotalDuration(newDuration);
            }
        );
    }

    return (
        <div>

            <h1>Playlist</h1>

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
                { songs.filter(s => s.inPlaylist).map(song => {
                    return (
                        <tr key={song.uuid}>
                            <td>{song.title}</td>
                            <td>{song.artist}</td>
                            <td>{song.duration[0]}:{song.duration[1]}</td>
                            <td><button onClick={() => onHandle(song)}>Remove from Playlist</button></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>


            <h3>Total Duration [mm:ss]: {totalDuration[0]}:{totalDuration[1]}</h3>

        </div>
    );
}