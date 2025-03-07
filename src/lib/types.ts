import React from "react"

export type TMDB = {
  id?: number,
  poster_path?: string,
  title?: string
}

export type Search = {
  title: string
}

export type MainLayoutProps = {
  children: React.ReactNode
}

