import { Route, Routes } from "react-router-dom"
import MovieList from "./components/MovieList"
import MoviePage from "./pages/MoviePage"
import MainLayout from "./layouts/MainLayout"
import ShowsList from "./components/ShowsList"
import TvShowPage from "./pages/TvShowPage"
import './index.css';

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<MovieList />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/shows" element={<ShowsList />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/show/:id" element={<TvShowPage />} />
      </Route>
    </Routes>
  )
}

export default App
