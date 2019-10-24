import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { BG_COLOR, GREY_COLOR, TINT_COLOR } from "../../constants/Color";
import Layout from "../../constants/Layout";
import Loader from "../../components/Loader";
import Section from "../../components/Section";
import MovieItem from "../../components/MovieItem";

const Container = styled.View`
  flex: 1;
  background-color: ${BG_COLOR};
`;

const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 1);
  width: ${Layout.width / 1.6};
  border-radius: 20px;
  padding: 10px;
`;

const SearchResults = styled.ScrollView`
  margin-top: 20px;
`;

const InputContainer = styled.View`
  align-items: center;
  margin-vertical: 20px;
`;

const SearchPresenter = ({
  loading,
  movieResults,
  tvResults,
  searchTerm,
  handleSearchUpdate,
  onSubmitEditing
}) => (
  <Container>
    <InputContainer>
      <Input
        value={searchTerm}
        onChangeText={handleSearchUpdate}
        returnKeyTypes="search"
        placeholder="search movies and tv"
        placeholderTextColor={GREY_COLOR}
        onSubmitEditing={onSubmitEditing}
      />
    </InputContainer>
    <SearchResults>
      {loading ? (
        <Loader />
      ) : (
        <>
          {movieResults ? (
            movieResults.length > 0 ? (
              <Section title="Movie Results">
                {movieResults
                  // if문 movieResults 길이 0보다 클때를 이용, true가 아니면 text 'couln't find anything no result'
                  // 혹은 아무것도 안보일때
                  .filter(movie => movie.poster_path !== null)
                  .map(movie => (
                    <MovieItem
                      key={movie.id}
                      id={movie.id}
                      posterPhoto={movie.poster_path}
                      title={movie.title}
                      overview={movie.overview}
                      backgroundPhoto={movie.backdrop_path}
                      voteAvg={movie.vote_average}
                    />
                  ))}
              </Section>
            ) : null
          ) : null}
          {tvResults ? (
            tvResults.length > 0 ? (
              <Section title="TV Results">
                {tvResults
                  .filter(tv => tv.poster_path !== null)
                  .map(tv => (
                    <MovieItem
                      isMovie={false}
                      key={tv.id}
                      id={tv.id}
                      backgroundPhoto={tv.backdrop_path}
                      posterPhoto={tv.poster_path}
                      title={tv.name}
                      voteAvg={tv.vote_average}
                    />
                  ))}
              </Section>
            ) : null
          ) : null}
        </>
      )}
    </SearchResults>
  </Container>
);

SearchPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  tvResults: PropTypes.array,
  movieResults: PropTypes.array,
  searchTerm: PropTypes.string,
  handleSearchUpdate: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired
};

export default SearchPresenter;
