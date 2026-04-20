import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectError, selectIsLoading} from '../../redux/contacts/selectors';
import ContactList from '../../components/ContactList/ContactList'
import SearchBox from '../../components/SearchBox/SearchBox';
import ContactForm from '../../components/ContactForm/ContactForm';
import { fetchContacts } from '../../redux/contacts/operations';
import css from './ContactsPage.module.css';


export default function ContactsPage() {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    useEffect(() => { dispatch(fetchContacts()) }, [dispatch]);

    return (
        <div className={css.contactspage}>
            <h2 className={css.title}>Phonebook</h2>
            <ContactForm />
            <SearchBox />
            {isLoading && !error && <b>Loading contacts...</b>}
            <ContactList />
        </div>
    )
}