import React from "react";
import TVPresenter from "./TVPresenter.js";
import { tv } from "../../api.js";

export default class extends React.Component {
  state = {
    loading: true,
    popular: null,
    airingThisWeek: null,
    airingToday: null,
    error: null
  };

  // await을 사용하고 싶은곳에 async
  async componentDidMount() {
    let popular, topRated, airingToday, error;
    try {
      ({
        data: { results: popular }
      } = await tv.getPopular());
      ({
        data: { results: topRated }
      } = await tv.getTopRated());
      ({
        data: { results: airingToday }
      } = await tv.getAiringToday());
    } catch (error) {
      console.log(error);
      error = "tv 정보를 얻을 수 없습니다:(";
    } finally {
      this.setState({
        loading: false,
        popular,
        topRated,
        airingToday,
        error
      });
    }
  }

  render() {
    const { loading, popular, topRated, airingToday } = this.state;
    console.log(this.state);
    return (
      <TVPresenter
        loading={loading}
        popular={popular}
        topRated={topRated}
        airingToday={airingToday}
      />
    );
  }
}
