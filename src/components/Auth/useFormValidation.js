import { useState } from "react";

function useFormValidation(initialState) {
    const[values, setValues] = useState(initialState);

    function handleChange(event) {
        event.persist();
        const { target: { name, value } } = event;
        setValues(previousValues => ({
            ...previousValues,
            [name]: value
        }))
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log({ values })
    }
    return { handleSubmit, handleChange, values };
}

export default useFormValidation;
