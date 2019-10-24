import React, { useState, useEffect } from "react";
import TVPresenter from "./TVPresenter.js";
import { tv } from "../../api.js";

export default function TVContainer() {
  const [loading, setLoading] = useState(true);
  const [popular, setPopular] = useState(null);
  const [topRated, setTopRated] = useState(null);
  const [airingToday, setAiringToday] = useState(null);
  const [error, setError] = useState(null);

  async function LoadTV() {
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
      setError("tv 정보를 얻을 수 없습니다:(");
    } finally {
      setLoading(false);
      setPopular(popular);
      setTopRated(topRated);
      setAiringToday(airingToday);
      setError(error);
    }
  }

  useEffect(() => {
    LoadTV();
  }, []);

  return (
    <TVPresenter
      loading={loading}
      popular={popular}
      topRated={topRated}
      airingToday={airingToday}
    />
  );
}
