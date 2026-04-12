import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectError, selectIsLoading} from './redux/selectors';
import ContactList from './components/ContactList/ContactList'
import SearchBox from './components/SearchBox/SearchBox';
import ContactForm from './components/ContactForm/ContactForm';
import { fetchContacts } from './redux/contactsOps';

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {dispatch(fetchContacts())}, [dispatch])

  return (
    <div className='phonebook'>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {isLoading && !error && <b>Loading contacts...</b>}
      <ContactList />
    </div>
  )
}

export default App