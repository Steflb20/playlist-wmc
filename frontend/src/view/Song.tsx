import React, {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import './View.css';
import {SongService} from "../common/services/Song.service";


export const Song: React.FC = () => {
    const [errorMsg, setErrorMsg] = useState<string>('');

    const nav = useNavigate();

    const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const title = data.get('title') as string|null;
        const artist = data.get('artist') as string|null;
        const duration = data.get('duration') as string|null;

        const validationRegex = /\d\d:\d\d/;

        if (duration && title && artist && validationRegex.test(duration)) {
            const durationArray = duration.split(":").map(d => parseInt(d));

            const newSong: ISong = {
                title: title,
                artist: artist,
                duration: durationArray,
                inPlaylist: false
            };

            SongService.postSong(newSong).then(newSong => {
                nav('/songs');
            })
        } else {
            setErrorMsg('validate your input!');
        }

    }


    return (
        <div>

            <h1>Add Song</h1>

            <form onSubmit={onSubmitForm}>

                <label htmlFor="title">Title*: </label>
                <input type="text" name="title" id="title" required={true} />

                <label htmlFor="artist">Artist*: </label>
                <input type="text" name="artist" id="artist" required={true} />

                <label htmlFor="duration">Duration [mm:ss]*: </label>
                <input type="text" name="duration" id="duration" required={true} />

                <input type="submit" value="Add Song"/>

                <span style={{ color : 'red'}}>{errorMsg}</span>
            </form>
        </div>
    )
}