import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ComplaintProvider } from './context/ComplaintContext';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import TrackComplaint from './pages/TrackComplaint';
import UserDashboard from './pages/UserDashboard';
import NewComplaint from './pages/NewComplaint';
import ComplaintDetail from './pages/ComplaintDetail';
import AgentDashboard from './pages/AgentDashboard';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ComplaintProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/track" element={<TrackComplaint />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute roles={['user']}>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/complaints/new"
              element={
                <ProtectedRoute roles={['user']}>
                  <NewComplaint />
                </ProtectedRoute>
              }
            />
            <Route
              path="/complaints/:id"
              element={
                <ProtectedRoute>
                  <ComplaintDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agent"
              element={
                <ProtectedRoute roles={['agent']}>
                  <AgentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ComplaintProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
