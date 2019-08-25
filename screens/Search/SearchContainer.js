import React from "react";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
  state = {
    loading: false,
    movieResults: null,
    tvResults: null,
    searchTerm: ""
  };

  handleSearchUpdate = text => {
    this.setState({
      searchTerm: text
    });
  };

  render() {
    const {
      loading,
      movieResults,
      tvResults,
      searchTerm,
      handleSearchUpdate
    } = this.props;
    return (
      <SearchPresenter
        loading={loading}
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        handleSearchUpdate={handleSearchUpdate}
      />
    );
  }
}