import React from 'react';
import { Redirect } from "react-router-dom";
import { Route } from 'react-router-dom';

import { isUserAuthenticated, getLoggedInUser } from './helpers/authUtils';

// lazy load all the views
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Patients = React.lazy(() => import('./pages/Patients/Patients'));
const Tasks = React.lazy(() => import('./pages/Tasks/Tasks'));
const Reports = React.lazy(() => import('./pages/Reports/Reports'));
const PatientProfile = React.lazy(() => import('./pages/Patients/PatientProfile'));
const FormCreate = React.lazy(() => import('./pages/Forms/FormCreate'));
const PatientFile = React.lazy(() => import('./pages/Patients/PatientFile'));

//Placeholder Routes
const Administration = React.lazy(() => import('./pages/Administration/Administration'));
const FormComplete = React.lazy(() => import('./pages/Forms/FormComplete'));

// auth
const Login = React.lazy(() => import('./pages/auth/Login'));
const Logout = React.lazy(() => import('./pages/auth/Logout'));
const ForgetPassword = React.lazy(() => import('./pages/account/ForgetPassword'));
const Register = React.lazy(() => import('./pages/account/Register'));
const ConfirmAccount = React.lazy(() => import('./pages/account/Confirm'));

// handle auth and authorization

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route {...rest} render={props => {
    const isAuthTokenValid = isUserAuthenticated();
    if (!isAuthTokenValid) {
      // not logged in so redirect to login page with the return url
      return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    }

    const loggedInUser = getLoggedInUser();
    // check if route is restricted by role
    if (roles && roles.indexOf(loggedInUser.role) === -1) {
      // role not authorised so redirect to home page
      return <Redirect to={{ pathname: '/' }} />
    }

    // authorised so return component
    return <Component {...props} />
  }} />
)

const routes = [
  // auth and account
  { path: '/login', name: 'Login', component: Login, route: Route },
  { path: '/logout', name: 'Logout', component: Logout, route: Route },
  { path: '/forget-password', name: 'Forget Password', component: ForgetPassword, route: Route },
  { path: '/register', name: 'Register', component: Register, route: Route },
  { path: '/confirm', name: 'Confirm', component: ConfirmAccount, route: Route },

  // "Finished" pages
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, route: PrivateRoute, roles: ['Admin'], title: 'Dashboard' },
   { path: '/patients', name: 'Patient', component: Patients, route: PrivateRoute, roles: ['Admin'], title: 'Patients' },
    { path: '/tasks', name: 'Tasks', component: Tasks, route: PrivateRoute, roles: ['Admin'], title: 'Tasks' },
    { path: '/reports', name: 'Reports', component: Reports, route: PrivateRoute, roles: ['Admin'], title: 'Reports' },
    { path: '/PatientProfile', name: 'PatientProfile', component: PatientProfile, route: PrivateRoute, roles: ['Admin'], title: 'Patient Profile' },
     //{ path: '/:id', name: 'PatientProfile', component: PatientProfile, route: PrivateRoute, roles: ['Admin'], title: 'Patient Profile' },
    { path: '/fromCreate', name: 'FormCreate', component: FormCreate, route: PrivateRoute, roles: ['Admin'], title: 'Form Creation' },
    { path: '/PatientFile', name: 'PatientFile', component: PatientFile, route: PrivateRoute, roles: ['Admin'], title: 'Patients Files' },

    //Placeholder pages
    { path: '/Administration', name: 'Administration', component: Administration, route: PrivateRoute, roles: ['Admin'], title: 'Administration' },
    { path: '/formComplete', name: 'formComplete', component: FormComplete, route: PrivateRoute, roles: ['Admin'], title: 'Complete Form' },
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />,
    route: PrivateRoute
  },
  
]

export { routes, PrivateRoute };
