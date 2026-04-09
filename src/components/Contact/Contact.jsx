import css from './Contact.module.css'
import { useDispatch } from "react-redux";
import { deleteContact } from '../../redux/contactsSlice';


const Contact = ({ contact }) => {
    const { name, number } = contact;
    const dispatch = useDispatch();
    const handleDelete = () => dispatch(deleteContact(contact.id));

    return (
        <div className={css.contactcard}>
            <div className={css.contactinfo}>
                <div>
                    <svg><use href="/src/assets/symbol-defs.svg#icon-user"></use></svg>
                    <p>{name}</p>
                </div>
                <div>
                    <svg><use href="/src/assets/symbol-defs.svg#icon-phone"></use></svg>
                    <p>{number}</p>
                </div>
            </div>
            <button className={css.deletebutton} onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default Contact