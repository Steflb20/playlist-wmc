import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SongsDashboard} from "./view/SongsDashboard";
import {PlaylistDashboard} from "./view/PlaylistDashboard";
import {Layout} from "./view/Layout";
import {Song} from "./view/Song";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Layout />}>
              <Route path={'/songs'} element={<SongsDashboard />} />
              <Route path={'/playlist'} element={<PlaylistDashboard />} />
              <Route path={'/add'} element={<Song />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
