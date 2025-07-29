import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './Error/ErrorPage.jsx';
import PrivateRoute from './router/privateRouter.jsx';
import DashboardLayout from './dashboard/DashboardLayout.jsx';
import FormList from './dashboard/ApplicantDetails.jsx';
import FormDetails from './dashboard/FormDetails.jsx';
import UpdatePass from './dashboard/Profile/UpdatePass.jsx';
import Login from './dashboard/login.jsx';
import Register from './dashboard/register.jsx';
import LoginRoute from './router/LoginRoute.jsx';
import Promoters from './dashboard/Promoters/Promoters.jsx';
import AddNew from './dashboard/Promoters/AddNew.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import OtpForm from './component/OtpForm.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
  {
    path: 'opt-form',
    element: <OtpForm />,
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        path: 'apply',
        element: <FormList />
      },
      {
        path: 'view/:id',
        element: <FormDetails />
      },
      {
        path: 'promoters',
        element: <Promoters />
      },
      {
        path: 'add-new-promoters',
        element: <AddNew />
      },
      {
        path: 'profile',
        element: <UpdatePass />
      },
    ]
  }
  ,
  {
    path: '/admin/login',
    element: <LoginRoute><Login></Login></LoginRoute>
  },
  {
    path: '/admin/register',
    element: <LoginRoute><Register></Register></LoginRoute>
  },

]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
