import React from "react"

export type TMDB = {
  id?: number,
  poster_path?: string,
  title?: string
}

export type MovieDetails = {

}

export type Search = {
  title: string
}

export type MainLayoutProps = {
  children: React.ReactNode
}

export type SearchResult = {
  id: string;
  title?: string;
  name?: string;
  poster_path?: string;
  media_type?: 'movie' | 'tv';
  backdrop_path?: string;
  release_date?: string | undefined;
  first_air_date?: string | undefined;
  genre_ids?: number[];
  overview?: string;
};

export type Server = {
  serverUrl: string;
  serverName: string;
}

export type TMDBVideo = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
  iso_639_1: string;
  iso_3166_1: string;
}

