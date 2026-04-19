// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { selectError, selectIsLoading} from './redux/contacts/selectors';
// import ContactList from './components/ContactList/ContactList'
// import SearchBox from './components/SearchBox/SearchBox';
// import ContactForm from './components/ContactForm/ContactForm';
// import { fetchContacts } from './redux/contacts/operations';

import { Routes, Route } from "react-router-dom"
import { Suspense, lazy } from 'react';
import { useDispatch } from "react-redux";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { refreshUser } from "./redux/auth/operations";
import { AppBar } from './components/AppBar/AppBar';
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { RestrictedRoute } from "./components/RestrictedRoute/RestrictedRoute";

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage/RegistrationPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));


function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  // const isLoading = useSelector(selectIsLoading);
  // const error = useSelector(selectError);

  useEffect(() => {dispatch(refreshUser())}, [dispatch])

  return isRefreshing ? (
    <strong>Refreshing user...</strong>
  ) : (
    <div className="App">
      <AppBar/>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RestrictedRoute redirectTo="/contacts" component={<RegistrationPage/>}/>} />
          <Route path="/login" element={<RestrictedRoute redirectTo="/contacts" component={<LoginPage/>}/>} />
          <Route path="/contacts" element={<PrivateRoute redirectTo="/login" component={<ContactsPage/>}/>} />
          {/* <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Suspense>
    </div>

    // <div className='phonebook'>
    //   <h1>Phonebook</h1>
    //   <ContactForm />
    //   <SearchBox />
    //   {isLoading && !error && <b>Loading contacts...</b>}
    //   <ContactList />
    // </div>
  )
}

export default App