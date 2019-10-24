import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import Section from "../../components/Section";
import MovieItem from "../../components/MovieItem";
import styled from "styled-components";
import { BG_COLOR } from "../../constants/Color";

const Container = styled.ScrollView`
  background-color: ${BG_COLOR};
`;

const TVPresenter = ({ loading, popular, topRated, airingToday }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {airingToday ? (
        <Section title="Airing Today">
          {airingToday
            .filter(tv => tv.poster_path !== null)
            .map(tv => (
              <MovieItem
                isMovie={false}
                key={tv.id}
                id={tv.id}
                posterPhoto={tv.poster_path}
                title={tv.name}
                voteAvg={tv.vote_average}
                backgroundPhoto={tv.backdrop_path}
              />
            ))}
        </Section>
      ) : null}
      {popular ? (
        <Section title="Popular">
          {popular
            .filter(tv => tv.poster_path !== null)
            .map(tv => (
              <MovieItem
                isMovie={false}
                key={tv.id}
                id={tv.id}
                posterPhoto={tv.poster_path}
                title={tv.name}
                voteAvg={tv.vote_average}
                backgroundPhoto={tv.backdrop_path}
              />
            ))}
        </Section>
      ) : null}
      {topRated ? (
        <Section title="Top Rated" horizontal={false}>
          {topRated
            .filter(tv => tv.poster_path !== null)
            .map(tv => (
              <MovieItem
                isMovie={false}
                horizontal={true}
                key={tv.id}
                id={tv.id}
                overview={tv.overview}
                posterPhoto={tv.poster_path}
                title={tv.name}
                voteAvg={tv.vote_average}
                backgroundPhoto={tv.backdrop_path}
              />
            ))}
        </Section>
      ) : null}
    </Container>
  );

TVPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  popular: PropTypes.array,
  topRated: PropTypes.array,
  airingToday: PropTypes.array
};

export default TVPresenter;
