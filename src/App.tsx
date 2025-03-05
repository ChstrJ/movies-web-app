import { Route, Routes } from "react-router-dom"
import MovieList from "./components/MovieList"
import MoviePage from "./pages/MoviePage"
import MainLayout from "./layouts/MainLayout"
import ShowsList from "./components/ShowsList"
import TvShowPage from "./pages/TvShowPage"

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/movies" element={<MovieList />} />
        <Route path="/shows" element={<ShowsList />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/shows/:id" element={<TvShowPage />} />
      </Routes>
    </MainLayout>
  )
}

export default App
