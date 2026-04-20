import { Routes, Route } from "react-router-dom"
import { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from 'react-hot-toast';
import { selectIsRefreshing } from "./redux/auth/selectors";
import { refreshUser } from "./redux/auth/operations";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { RestrictedRoute } from "./components/RestrictedRoute/RestrictedRoute";
import Layout from "./components/Layout/Layout";

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage/RegistrationPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));


function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {dispatch(refreshUser())}, [dispatch])

  return isRefreshing ? (
    <strong>Refreshing user...</strong>
  ) : (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Toaster />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RestrictedRoute redirectTo="/contacts" component={<RegistrationPage/>}/>} />
            <Route path="/login" element={<RestrictedRoute redirectTo="/contacts" component={<LoginPage/>}/>} />
            <Route path="/contacts" element={<PrivateRoute redirectTo="/login" component={<ContactsPage/>}/>} />
          </Routes>
        </Layout>
      </Suspense>
    </div>
  )
}

export default App