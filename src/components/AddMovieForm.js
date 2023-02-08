import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const AddMovieForm = (props) => {
  const { push } = useHistory();
  const { setMovies } = props;
  const { movies } = props;

  const [newMovie, setNewMovie] = useState({
    title: "",
    director: "",
    genre: "",
    metascore: "",
    description: "",
  });
  const handleChange = (event) => {
    setNewMovie({
      ...newMovie,
      [event.target.name]: event.target.value,
    });
  };

  const handleCancel = () => {
    setNewMovie({
      title: "",
      director: "",
      genre: "",
      metascore: "",
      description: "",
    });
  };

  const handleButton = () => {
    let buttonDisabled = true;
    const count = movies.filter(
      (movie) => movie.title === newMovie.title
    ).length;
    if (count === 0) {
      buttonDisabled = false;
    } else {
      buttonDisabled = true;
    }
    return buttonDisabled;
  };

  useEffect(() => {
    handleButton();
  }, [newMovie]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:9000/api/movies", newMovie)
      .then((res) => {
        setMovies(res.data);
        push("/movies/");
      })
      .catch((err) => console.log(err));
  };

  const { title, director, genre, metascore, description } = newMovie;
  return (
    <div className="bg-white rounded-md shadow flex-1">
      <form onSubmit={handleSubmit}>
        <div className="p-5 pb-3 border-b border-zinc-200">
          <h4 className="text-xl font-bold">
            Düzenleniyor <strong>{title}</strong>
          </h4>
        </div>

        <div className="px-5 py-3">
          <div className="py-2">
            <label className="block pb-1 text-lg">Title</label>
            <input
              value={title}
              onChange={handleChange}
              name="title"
              type="text"
            />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Director</label>
            <input
              value={director}
              onChange={handleChange}
              name="director"
              type="text"
            />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Genre</label>
            <input
              value={genre}
              onChange={handleChange}
              name="genre"
              type="text"
            />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Metascore</label>
            <input
              value={metascore}
              onChange={handleChange}
              name="metascore"
              type="number"
            />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Description</label>
            <textarea
              value={description}
              onChange={handleChange}
              name="description"
            ></textarea>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-zinc-200 flex justify-end gap-2">
          <button onClick={handleCancel}>Vazgeç</button>
          <button
            type="submit"
            className="myButton bg-green-700 hover:bg-green-600"
            disabled={handleButton()}
          >
            Ekle
          </button>
          {handleButton() && (
            <p>
              En az 1 maddeyi doldurmanız gerekmektedir. Ayrıca, daha önce
              eklenen bir film ekleyemezsiniz.{" "}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddMovieForm;
