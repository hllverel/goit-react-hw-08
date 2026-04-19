import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import css from './LoginForm.module.css'

export default function LoginForm() {
    const dispatch = useDispatch();

    const handleSubmit = (values, actions) => {
        dispatch(login({
            email: values.email,
            password: values.password,
        }))
        .unwrap()
        .then(() => {
            console.log('login success');
        })
        actions.resetForm();
    };

    return (
        <Formik initialValues={{email:"", password:""}} onSubmit={handleSubmit}>
            <Form className={css.loginform}>
                <label htmlFor={emailFieldId}>Email
                    <Field type="email" name="email" id={emailFieldId} />
                    <ErrorMessage name="email" component="span" />
                </label>

                <label htmlFor={passwordFieldId}>Password
                    <Field type="password" name="password" id={passwordFieldId} />
                    <ErrorMessage name="password" component="span" />
                </label>
                
                <button type="submit">Login</button>
            </Form>
        </Formik>
    )
}

