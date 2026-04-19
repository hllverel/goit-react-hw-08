import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import css from './ContactForm.module.css'
import { nanoid } from 'nanoid'
import { useDispatch } from 'react-redux';
import { addContact, fetchContacts } from '../../redux/contacts/operations';

const FeedbackSchema = Yup.object().shape({
    name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required"),
    number: Yup.string().matches(/^[0-9-]+$/, "Only numbers and hyphens allowed").min(3, "Too Short!").max(50, "Too Long!").required("Required") //fix
});

export default function ContactForm() {
    const dispatch = useDispatch();

    const nameFieldId = nanoid();
    const numberFieldId = nanoid();
    
    const handleSubmit = (values, actions) => {
        dispatch(addContact({
            name: values.name,
            number: values.number,
        }))
        .then(() => {
            dispatch(fetchContacts())
        })
        actions.resetForm();
    };

    return (
        <Formik initialValues={{name:"", number:""}} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
            <Form className={css.contactform}>
                <label htmlFor={nameFieldId}>Name
                    <Field type="text" name="name" id={nameFieldId} />
                    <ErrorMessage name="name" component="span" />
                </label>

                <label htmlFor={numberFieldId}>Number
                    <Field type="tel" name="number" id={numberFieldId} />
                    <ErrorMessage name="number" component="span" />
                </label>
                
                <button type="submit">Add contact</button>
            </Form>
        </Formik>
    )
}