import React, { useEffect } from "react";
import s from "./style.module.scss";
import { trendingMovies } from "../../state/movies";
import { useDispatch, useSelector } from "react-redux";
import { topRatedM } from "../../state/topRatedM";
const fetch = require("node-fetch");

export default function Home() {
  const movies = useSelector((state) => state.movies.data);
  const trm = useSelector((state) => state.trm.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const trmUrl =
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
    const urlMovies =
      "https://api.themoviedb.org/3/trending/movie/week?language=en-US";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDJiNmYwZDJmMDEzNmEyNDU2OTA0ZThiOTcxMDg2NiIsInN1YiI6IjY1NDU2OGY5NmJlYWVhMDEyYzhkOGQwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J7iaa6Q0a2V5Ijf5hbZ5YiHmIpTHajWeI2uJWFIBln0",
      },
    };

    fetch(urlMovies, options)
      .then((res) => res.json())
      .then((json) => {
        dispatch(trendingMovies(json.results));
      })
      .catch((err) => console.error("error:" + err));

    fetch(trmUrl, options)
      .then((res) => res.json())
      .then((json) => dispatch(topRatedM(json.results)))
      .catch((err) => console.error("error:" + err));
  }, [dispatch]);
  return (
    <>
      <div>
        <h1 className={s.mar}>¡Welcome to StreamCave!</h1>
      </div>
      <div className={s.container}>
        <h2 className={s.pos}>Trending movies</h2>
        <div className={s.rowContainer}>
          {trm &&
            trm.payload.map((movie) => (
              <div key={movie.id} className={s.rowww}>
                <img
                  className={s.large}
                  src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                  alt="imagen de la pelicula"
                />
                <h4 className={s.centeredText}>{movie.title}</h4>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
