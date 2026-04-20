import LoginForm from "../../components/LoginForm/LoginForm";
import css from './Loginpage.module.css';

export default function LoginPage() {
    return (
        <div className={css.loginpage}>
            <h2 className={css.title}>Login</h2>
            <LoginForm/>
        </div>
    )
}