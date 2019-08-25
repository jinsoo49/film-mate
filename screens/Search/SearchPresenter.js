import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { BG_COLOR } from "../../constants/Color";

const Container = styled.View`
  flex: 1;
  background-color: ${BG_COLOR};
`;

const Input = styled.TextInput``;

const SearchPresenter = ({
  loading,
  movieResults,
  tvResults,
  searchTerm,
  handleSearchUpdate
}) => (
  <Container>
    <Input
      value={searchTerm}
      onChangeText={handleSearchUpdate}
      autoFocus
      returnKeyTypes={"go"}
    />
  </Container>
);

SearchPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  tvResults: PropTypes.array,
  movieResults: PropTypes.array,
  searchTerm: PropTypes.string,
  handleSearchUpdate: PropTypes.func.isRequired
};

export default SearchPresenter;
