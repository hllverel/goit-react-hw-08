import Contact from '../Contact/Contact'
import css from './ContactList.module.css'
import { useSelector } from 'react-redux';
import { selectContacts } from '../../redux/contacts/selectors';
import { selectNameFilter } from '../../redux/filters/slice';
import { selectFilteredContacts } from '../../redux/contacts/slice';


const ContactList = () => {
    const visibleContacts = useSelector(selectFilteredContacts);

    return (
        <ul className={css.contactlist}>
            {visibleContacts.map((contact) => (
                <li key={contact.id}>
                    <Contact contact={contact}/>
                </li>
            ))}
        </ul>
    );
};

export default ContactList