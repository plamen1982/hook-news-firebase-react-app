import { useState, useEffect } from "react";
/**
 * @function useFormValidation, custom hook
 * @param initialState, object with the initialState of the hook 
 * @param validate, function with the validation for the initialState object
 * @param authenticate, function that make authenticate functionality to the initialState object
 * @returns {object}, with properties handleSubmit - function, handleChange - function
 * handleBlur - function, values - object, errors - object, isSubmitting - boolean
 */
function useFormValidation(initialState, validate, authenticate) {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);

    useEffect(() => {
        if(isSubmitting) {
           const noErrors = Object.keys(errors).length === 0;
           if(noErrors) {
            authenticate();
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
        setErrors(validationErrors);
        setSubmitting(true);
    }
    return { handleSubmit, handleChange, handleBlur, values, errors, isSubmitting };
}

export default useFormValidation;
