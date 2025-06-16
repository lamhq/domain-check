import { Route, Routes } from 'react-router';
import SignInPage from './auth/pages/SignInPage';
import MainLayout from './common/templates/MainLayout';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignInPage />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}
