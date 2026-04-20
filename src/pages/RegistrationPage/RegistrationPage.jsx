import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import css from './RegistrationPage.module.css';

export default function RegistrationPage() {
    return (
        <div className={css.registerpage}>
            <h2 className={css.title}>Register</h2>
            <RegistrationForm/>
        </div>
    )
}