import React from "react";
import MoviesPresenter from "./MoviesPresenter";
import { movies } from "../../api";

export default class MoviesContainer extends React.Component {
  state = {
    loading: true,
    upcoming: null,
    popular: null,
    nowPlaying: null,
    error: null
  };

  async componentDidMount() {
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

      // 컴포넌트를 두번 쓰게 되는 문제를 해결 , finally에서 한번만 작성
      // this.setState({
      //   upcoming,
      //   popular,
      //   nowPlaying
      // });
    } catch {
      error = "can't get Movies";
    } finally {
      this.setState({ loading: false, error, upcoming, popular, nowPlaying });
    }
  }

  render() {
    const { loading, upcoming, popular, nowPlaying } = this.state;
    console.log(this.state);
    return (
      <MoviesPresenter
        loading={loading}
        upcoming={upcoming}
        popular={popular}
        nowPlaying={nowPlaying}
      />
    );
  }
}
