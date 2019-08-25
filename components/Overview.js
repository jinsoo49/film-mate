import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import makePhotoUrl from "../utils/makePhotoUrl";
import { TINT_COLOR } from "../constants/Color";

const Content = styled.Text`
  color: ${TINT_COLOR};
  font-size: 12px;
  margin-vertical: 10px;
`;

const Overview = ({ overview, horizontal = false }) =>
  horizontal ? (
    <Content>
      {overview.length > 297 ? `${overview.substring(0, 300)}...` : overview}
      {"  "}
    </Content>
  ) : (
    <Content>
      {overview.length > 117 ? `${overview.substring(0, 120)}...` : overview}
      {"  "}
    </Content>
  );

Overview.propTypes = {
  overview: PropTypes.string
};

export default Overview;
