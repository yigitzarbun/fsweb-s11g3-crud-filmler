import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import MovieList from "./components/MovieList";
import Movie from "./components/Movie";
import EditMovieForm from "./components/EditMovieForm";
import MovieHeader from "./components/MovieHeader";
import AddMovieForm from "./components/AddMovieForm";

import FavoriteMovieList from "./components/FavoriteMovieList";

import axios from "axios";

const App = (props) => {
  const { push } = useHistory();
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/movies")
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {
    axios
      .delete(`http://localhost:9000/api/movies/${id}`)
      .then((res) => {
        setMovies(res.data);
        push("/movies");
      })
      .catch((err) => console.log(err));
  };

  const addToFavorites = (movie) => {
    setFavoriteMovies([...favoriteMovies, movie]);
  };

  const removeFromFavorites = (movie) => {
    const copyFavs = [...favoriteMovies];
    const index = copyFavs.indexOf(movie);
    copyFavs.splice(index, 1);
    setFavoriteMovies([...copyFavs]);
  };

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <nav className="bg-zinc-800 px-6 py-3">
        <h1 className="text-xl text-white">HTTP / CRUD Film Projesi</h1>
        <button onClick={handleDarkMode}>Mod</button>
      </nav>

      <div className="max-w-4xl mx-auto px-3 pb-4">
        <MovieHeader darkMode={darkMode} />
        <div className="flex flex-col sm:flex-row gap-4">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />
          <Switch>
            <Route path="/movies/edit/:id">
              <EditMovieForm movies={movies} setMovies={setMovies} />
            </Route>
            <Route path="/movies/add">
              <AddMovieForm setMovies={setMovies} movies={movies} />
            </Route>
            <Route path="/movies/:id">
              <Movie
                deleteMovie={deleteMovie}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                favoriteMovies={favoriteMovies}
              />
            </Route>

            <Route path="/movies">
              <MovieList movies={movies} />
            </Route>

            <Route path="/">
              <Redirect to="/movies" />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
