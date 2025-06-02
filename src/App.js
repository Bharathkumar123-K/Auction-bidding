import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import './styles/simple.css';
import auctionHouseTheme from './theme/auctionHouseTheme';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import LoginType from './pages/LoginType';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminProfile from './pages/AdminProfile';
import ItemDetails from './pages/ItemDetails';
import CreateItem from './pages/CreateItem';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider as CustomThemeProvider } from './contexts/ThemeContext';

// Using the imported antiqueTheme

const PrivateRoute = ({ children, requireAdmin = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (requireAdmin && user.user_type !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <CustomThemeProvider>
      <ThemeProvider theme={auctionHouseTheme}>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LoginType />} />
              <Route path="/login/:type" element={<Login />} />
              <Route path="/register/:type" element={<Register />} />
              <Route
                path="/home"
                element={
                  <>
                    <Navbar />
                    <Home />
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Navbar />
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <PrivateRoute requireAdmin>
                    <Navbar />
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/create-item"
                element={
                  <PrivateRoute>
                    <Navbar />
                    <CreateItem />
                  </PrivateRoute>
                }
              />
              <Route
                path="/items/:id"
                element={
                  <>
                    <Navbar />
                    <ItemDetails />
                  </>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </CustomThemeProvider>
  );
}

export default App;
