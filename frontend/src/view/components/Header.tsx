import React from "react";
import "../View.css";
import { Link } from "react-router-dom";


export const Header: React.FC = () => {
    return (
        <div className="header">
            <Link to={'/songs'}><h1>Song Manager</h1></Link>

            <div className="header-links">
                <Link to='/songs' ><p>Songs</p></Link>
                <Link to={'/playlist'}><p>Playlist</p></Link>
                <Link to={'/add'}><p>Add Song</p></Link>
            </div>
        </div>
    )
}