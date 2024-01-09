interface ISong {
    uuid?: string;
    artist: string;
    title: string;
    duration: number[],
    inPlaylist: boolean;
}