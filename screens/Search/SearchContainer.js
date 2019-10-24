import React, { useState } from "react";
import SearchPresenter from "./SearchPresenter";
import { movies, tv } from "../../api";

export default function SearchContainer() {
  const [loading, setLoading] = useState(false);
  const [movieResults, setMovieResults] = useState(null);
  const [tvResults, setTvResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  const handleSearchUpdate = text => {
    setSearchTerm(text);
  };

  const onSubmitEditing = async () => {
    if (searchTerm !== "") {
      let movieResults, tvResults;
      setLoading(true);
      try {
        ({
          data: { results: movieResults }
        } = await movies.searchMovies(searchTerm));
        await tv.searchShow(searchTerm);
        ({
          data: { results: tvResults }
        } = await tv.searchShow(searchTerm));
      } catch {
        setError("can't search");
      } finally {
        setLoading(false);
        setMovieResults(movieResults);
        setTvResults(tvResults);
      }
      return;
    }
  };

  return (
    <SearchPresenter
      loading={loading}
      movieResults={movieResults}
      tvResults={tvResults}
      searchTerm={searchTerm}
      onSubmitEditing={onSubmitEditing}
      handleSearchUpdate={handleSearchUpdate}
    />
  );
}
