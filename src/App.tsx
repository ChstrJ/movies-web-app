import { Route, Routes } from "react-router-dom"
import MovieList from "./components/MovieList"
import MoviePage from "./pages/MoviePage"
import MainLayout from "./layouts/MainLayout"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MovieList />} />
      <Route path="/movie/:id" element={<MoviePage />} />
    </Routes>
  )
}

export default App
