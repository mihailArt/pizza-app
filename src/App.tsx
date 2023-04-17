import { Route, Routes } from 'react-router-dom';
import Layout from './scenes/layout/Layout';
import MainPage from './scenes/MainPage/MainPage';
import BasketLayout from './scenes/BasketLayout/BasketLayout';
import User from './components/User/User';
import AuthGuard from './components/AuthGuard/AuthGuard';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route element={<AuthGuard />}>
          <Route path="basket" element={<BasketLayout />} />
        </Route>
        <Route path="user" element={<User />} />
      </Route>
    </Routes>
  );
}

export default App;
