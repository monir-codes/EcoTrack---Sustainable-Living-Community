import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AuthProvider from './Auth/AuthProvider/AuthProvider';
import PublicLayout from './Layouts/PublicLayout/PublicLayout';
import Home from './pages/Home/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout></PublicLayout>,
    children: [
      {
        index: true,
        Component: Home,
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
