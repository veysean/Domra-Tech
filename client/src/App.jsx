
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AdminDashboard from './pages/admin/Dashboard.jsx';
import OverviewPage from './pages/admin/Overview.jsx';
import UsersPage from './pages/admin/User.jsx';
import WordRequestPage from './pages/admin/WordRequest.jsx';
import WordsPage from './pages/admin/WordTranslation.jsx';
import SettingsPage from './pages/admin/Settings.jsx';
import PrivacyPage from './pages/admin/Privacy.jsx';
import CheckModePage from './pages/admin/CheckMode.jsx';


function App() {
  const { t, i18n } = useTranslation();

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<OverviewPage />} />
          <Route path="words" element={<WordsPage />} />
          <Route path="requests" element={<WordRequestPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="checkmode" element={<CheckModePage />} />
        </Route>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
