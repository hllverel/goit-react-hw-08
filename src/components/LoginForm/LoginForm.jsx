import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from "react";
import * as Yup from "yup";
import css from './LoginForm.module.css'

const FeedbackSchema = Yup.object().shape({
    email: Yup.string().email("Must enter a valid email address!").required("Required"),
    password: Yup.string().min(8, "Password must have at least 8 characters!").max(50, "Too Long!").required("Required")
});


export default function LoginForm() {
    const dispatch = useDispatch();

    const emailFieldId = useId();
    const passwordFieldId = useId();

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
        <Formik initialValues={{email:"", password:""}} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
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

