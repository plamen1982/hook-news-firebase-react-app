import { useState, useEffect } from "react";

function useFormValidation(initialState, validate) {
    const[values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);

    useEffect(() => {
        if(isSubmitting) {
           const noErrors = Object.keys(errors).length === 0;
           if(noErrors) {
               console.log('authenicated');
               setSubmitting(false);
           } else {
               setSubmitting(false);
           }
        }
    }, [errors]);

    function handleChange(event) {
        // event.persist();
        const { target: { name, value } } = event;
        setValues(previousValues => ({
            ...previousValues,
            [name]: value
        }));
    }

    function handleBlur() {
        const validationErrors = validate(values);
        setErrors(validationErrors);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const validationErrors = validate(values);
        console.log('user', values);
        setErrors(validationErrors);
        setSubmitting(true);
    }
    return { handleSubmit, handleChange, handleBlur, values, errors, isSubmitting };
}

export default useFormValidation;
