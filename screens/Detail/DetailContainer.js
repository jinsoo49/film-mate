import React, { useState, useEffect, Component } from "react";
import DetailPresenter from "./DetailPresenter";
import { movies, tv } from "../../api";

export default function DetailContainer(props) {
  const {
    navigation: {
      state: {
        params: {
          isMovie: paramIsMovie,
          id: paramId,
          posterPhoto: paramPosterPhoto,
          backgroundPhoto: paramBackgroundPhoto,
          voteAvg: paramVoteAvg,
          title: paramTitle,
          overview: paramOverview,
          genres: paramGenres
        }
      }
    }
  } = props;

  const [isMovie, setIsMovie] = useState(paramIsMovie);
  const [id, setId] = useState(paramId);
  const [posterPhoto, setPosterPhoto] = useState(paramPosterPhoto);
  const [backgroundPhoto, setBackgroundPhoto] = useState(paramBackgroundPhoto);
  const [voteAvg, setVoteAvg] = useState(paramVoteAvg);
  const [title, setTitle] = useState(paramTitle);
  const [overview, setOverview] = useState(paramOverview);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState(paramGenres);
  const [date, setDate] = useState(null);
  const [status, setStatus] = useState(null);

  async function LoadDetail() {
    // const { isMovie, id } = this.state;
    setIsMovie(isMovie);
    setId(id);
    let error, genres, overview, status, date, backgroundPhoto;
    try {
      if (isMovie) {
        ({
          data: {
            genres,
            overview,
            status,
            release_date: date,
            backdrop_Path: backgroundPhoto
          }
        } = await movies.getMovie(id));
      } else {
        ({
          data: {
            genres,
            overview,
            status,
            first_air_date: date,
            backdrop_Path: backgroundPhoto
          }
        } = await tv.getShow(id));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setGenres(genres);
      setOverview(overview);
      setStatus(status);
      setDate(date);
    }
  }

  useEffect(() => {
    LoadDetail();
  }, []);
  return (
    <DetailPresenter
      id={id}
      posterPhoto={posterPhoto}
      backgroundPhoto={backgroundPhoto}
      voteAvg={voteAvg}
      title={title}
      overview={overview}
      loading={loading}
      date={date}
      status={status}
      isMovie={isMovie}
      genres={genres}
    ></DetailPresenter>
  );
}

DetailContainer.navigationOptions = props => ({
  title: props.navigation.getParam("title")
});
