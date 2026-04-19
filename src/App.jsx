// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { selectError, selectIsLoading} from './redux/contacts/selectors';
// import ContactList from './components/ContactList/ContactList'
// import SearchBox from './components/SearchBox/SearchBox';
// import ContactForm from './components/ContactForm/ContactForm';
// import { fetchContacts } from './redux/contacts/operations';

import { Routes, Route } from "react-router-dom"
import { Suspense, lazy } from 'react';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage/RegistrationPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));


function App() {
  // const dispatch = useDispatch();
  // const isLoading = useSelector(selectIsLoading);
  // const error = useSelector(selectError);

  // useEffect(() => {dispatch(fetchContacts())}, [dispatch])

  return (
    <div className="App">
      <Navigation/>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
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