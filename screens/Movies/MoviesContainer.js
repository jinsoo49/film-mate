import React, { useState, useEffect } from "react";
import MoviesPresenter from "./MoviesPresenter";
import { movies } from "../../api";

export default function MoviesContainer() {
  const [upcoming, setUpcoming] = useState(null);
  const [popular, setPopular] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function LoadMovies() {
    let upcoming, popular, nowPlaying, error;
    try {
      // 객체 비구조화 할당 사용
      ({
        data: { results: upcoming }
      } = await movies.getUpcoming());
      ({
        data: { results: popular }
      } = await movies.getPopular());
      ({
        data: { results: nowPlaying }
      } = await movies.getNowPlaying());
    } catch {
      setError("can't get Movies");
    } finally {
      setUpcoming(upcoming);
      setPopular(popular);
      setNowPlaying(nowPlaying);
      setLoading(false);
    }
  }

  useEffect(() => {
    LoadMovies();
  }, []);

  return (
    <MoviesPresenter
      loading={loading}
      upcoming={upcoming}
      popular={popular}
      nowPlaying={nowPlaying}
    />
  );
}
