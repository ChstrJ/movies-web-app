import MainLayout from '@/layouts/MainLayout';
import { Route, Routes } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>

      </Route>
    </Routes>
  )

}


export default AppRoutes;
