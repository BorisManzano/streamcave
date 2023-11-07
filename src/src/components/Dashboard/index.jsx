import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToMyList, login, removeToMyList } from "../../state/user";
import { useNavigate } from "react-router";
import s from "./style.module.scss";
import { trendingTVSeries } from "../../state/tvSeries";
import { trendingMovies } from "../../state/movies";
import MyList from "../../commons/Like/myList";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.data);
  const TVSeries = useSelector((state) => state.tvSeries.data);

  const addToML = (movie) => {
    dispatch(addToMyList(movie));
  };

  const removeToML = (movie) => {
    dispatch(removeToMyList(movie));
  };

  useEffect(() => {
    const topRatedUrl =
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
    const trendingUrlTV =
      "https://api.themoviedb.org/3/trending/tv/week?language=en-US";
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

    fetch(topRatedUrl, options)
      .then((res) => res.json())
      .then((json) => {
        // dispatch(topRatedM(json.results));
      })
      .catch((err) => console.error("error:" + err));

    fetch(trendingUrlTV, options)
      .then((res) => res.json())
      .then((json) => dispatch(trendingTVSeries(json.results)))
      .catch((err) => console.error("error:" + err));
  }, [dispatch]);

  console.log(user);
  return (
    <>
      <div>
        <h1 className={s.mar}>What are you going to watch today?</h1>
      </div>
      <div className={s.container}>
        <h2 className={s.pos}>Trending movies</h2>
        <div className={s.rowContainer}>
          {movies &&
            movies.payload.map((movie) => (
              <div key={movie.id} className={s.rowww}>
                <img
                  className={s.large}
                  src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                  alt="imagen de la pelicula"
                />
                <h4 className={s.centeredText}>{movie.title}</h4>
                <MyList
                  key={movie.id}
                  movie={movie}
                  addToML={addToML}
                  removeToML={removeToML}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
