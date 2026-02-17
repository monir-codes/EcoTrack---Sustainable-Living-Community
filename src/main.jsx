import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AuthProvider from './Auth/AuthProvider/AuthProvider';
import PublicLayout from './Layouts/PublicLayout/PublicLayout';
import Home from './pages/Home/Home';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout></PublicLayout>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/register',
        Component: RegisterPage,
      },
      {
        path: '/login',
        Component: LoginPage,
      },
      {
        path:'/forgot-password',
        Component: ForgotPassword,
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider><RouterProvider router={router}></RouterProvider>
</AuthProvider>
  </StrictMode>,
)
