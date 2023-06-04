import React, { useState } from "react";
import axios from "axios";
import MovieComponent from "./components/MovieComp/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComp/MovieInfoComponent";
import './App.css'

export const API_KEY = "6f49b127";


function App() {
  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };
  return (
    <div className="Container">
      <header className="header">
        <div className="AppName">
          <img className="MovieImage" src="public/movie-icon.svg" alt="" />
          React Movie App
        </div>
        <div className="SearchBox">
        {/* style={{width: '32px', height: '32px'}} */}
          <img src="../public/images/search-icon.svg" alt="search" style={{width: '32px', height: '32px'}} />
          <input className="SearchInput"
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
          <img src="public/search-icon.svg" alt="" srcset="" />
        </div>
      </header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <div className="MovieListContainer">
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <img src="../public/movie-icon.svg" alt="" className="Placeholder" />
        )}
      </div>
    </div>
  );
}

export default App;
