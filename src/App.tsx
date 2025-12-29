import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/common/AppLayout';
import DashboardPage from './pages/DashboardPage';
import MarketsPage from './pages/MarketsPage';
import OrdersPage from './pages/OrdersPage';
import PortfolioPage from './pages/PortfolioPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/markets" element={<MarketsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
