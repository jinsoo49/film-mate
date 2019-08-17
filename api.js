import axios from "axios";

// 인스턴스를 위한 설정
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "c686a47083faa4abcfd1bc65e2133aea",
    language: "en-US"
  }
});

/*

Now Playing - movie
Upcoming - movie
Top Rated - TV
Popular - TV / Movie
Airing Today - TV
TVShow / Movie Detail
TV / Movie Search

*/

export const moviesApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  movieDetail: id =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos"
      }
    }),
  search: term =>
    api.get("search/movie", {
      params: {
        // String이 되어야 하기 때문에 자바스크립트에서 uri encoding
        query: encodeURIComponent(term)
      }
    })
};

export const tvApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
  showDetail: id =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos"
      }
    }),
  search: term =>
    api.get("search/tv", {
      params: {
        query: encodeURIComponent(term)
      }
    })
};
