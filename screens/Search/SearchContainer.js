import React from "react";
import SearchPresenter from "./SearchPresenter";
import { movies, tv } from "../../api";

export default class extends React.Component {
  state = {
    loading: false,
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    error: null
  };

  handleSearchUpdate = text => {
    this.setState({
      searchTerm: text
    });
  };

  onSubmitEditing = async () => {
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      let loading, movieResults, tvResults, error;
      this.setState({
        loading: true
      });
      try {
        ({
          data: { results: movieResults }
        } = await movies.searchMovies(searchTerm));
        await tv.searchShow(searchTerm);
        ({
          data: { results: tvResults }
        } = await tv.searchShow(searchTerm));
      } catch {
        error = "can't search";
      } finally {
        this.setState({
          loading: false,
          movieResults,
          tvResults
        });
      }
      return;
    }
  };

  render() {
    const {
      loading,
      movieResults,
      tvResults,
      searchTerm,
      handleSearchUpdate
    } = this.state;
    return (
      <SearchPresenter
        loading={loading}
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        onSubmitEditing={this.onSubmitEditing}
        handleSearchUpdate={this.handleSearchUpdate}
      />
    );
  }
}
