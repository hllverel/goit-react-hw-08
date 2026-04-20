import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from "react";
import * as Yup from "yup";
import css from './RegistrationForm.module.css';

const FeedbackSchema = Yup.object().shape({
    name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required"),
    email: Yup.string().email("Must enter a valid email address!").required("Required"),
    password: Yup.string().min(8, "Password must have at least 8 characters!").max(50, "Too Long!").required("Required")
});

export default function RegistrationForm() {
    const dispatch = useDispatch();

    const nameFieldId = useId();
    const emailFieldId = useId();
    const passwordFieldId = useId();

    const handleSubmit = (values, actions) => {
        dispatch(register({
            name: values.name,
            email: values.email,
            password: values.password,
        }))
        .unwrap()
        .then(() => {
            console.log('register success');
        })
        actions.resetForm();
    };

    return (
        <Formik initialValues={{name:"", email:"", password:""}} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
            <Form className={css.RegistrationForm}>
                <label htmlFor={nameFieldId}>Username
                    <Field type="text" name="name" id={nameFieldId} />
                    <ErrorMessage name="name" component="span" />
                </label>

                <label htmlFor={emailFieldId}>Email
                    <Field type="email" name="email" id={emailFieldId} />
                    <ErrorMessage name="email" component="span" />
                </label>

                <label htmlFor={passwordFieldId}>Password
                    <Field type="password" name="password" id={passwordFieldId} />
                    <ErrorMessage name="password" component="span" />
                </label>
                
                <button type="submit">Register</button>
            </Form>
        </Formik>
    )
}