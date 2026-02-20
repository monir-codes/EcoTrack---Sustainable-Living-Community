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
import Challenges from './Components/Challenges/Challenges';
import ChallengeDetails from './Components/ChallengeDetails/ChallengeDetails';
import AddChallenge from './Components/AddChallenge/AddChallenge';
import MyActivities from './Components/MyActivities/MyActivities';
import NotFound from './pages/NotFoundPage/NotFound';
import ActivityDetails from './Components/ActivityDetails/ActivityDetails';
import Profile from './Components/MyProfile/Profile';

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
      {
        path: '/challenges',
        Component: Challenges
      },
      {
        path: `/challenges/:id`,
        Component: ChallengeDetails
      },
      {
        path: '/challenges/add',
        element: <AddChallenge></AddChallenge>
      },
      {
        path:'/profile',
        Component: Profile,
      },
      {
        path: '/my-activities',
        Component: MyActivities
      },
      {
        path: '/my-activities/:id',
        element: <ActivityDetails></ActivityDetails>
      },
      {
        path: '*',
        Component: NotFound
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider><RouterProvider router={router}></RouterProvider>
</AuthProvider>
  </StrictMode>,
)
