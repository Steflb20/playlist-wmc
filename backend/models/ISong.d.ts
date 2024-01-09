interface ISong {
    uuid?: string;
    title: string;
    artist: string;
    duration: number[]; // [0] -> minutes; [1] -> seconds
    inPlaylist: boolean;
}