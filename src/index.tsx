import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes, BrowserRouter, useNavigate, useLocation } from 'react-router-dom';
import './index.css';
import App from './App';
import UserForm from './components/Register';
import UserList from './components/UserList';
import Login from './components/Login';

function RootRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  const publicPaths = ['/register', '/login'];

  useEffect(() => {
    const localPrivet = localStorage.getItem('username');

    if (!localPrivet && !publicPaths.includes(location.pathname)) {
      navigate('/register', { replace: true });
    }
  }, [navigate, location]);

  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<UserForm onUserCreated={() => {}} />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RootRouter />
    </BrowserRouter>
  </React.StrictMode>
);
