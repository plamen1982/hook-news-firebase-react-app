import React from "react";
import useFormValidation from '../Auth/useFormValidation';
import validateCreateLink from '../Auth/validations/validateCreateLink';

const INITIAL_STATE = {
  description: '',
  url: ''
}

function CreateLink(props) {
  const { 
    handleSubmit, 
    handleChange, 
    handleBlur, 
    values, 
    errors, 
    isSubmitting } = useFormValidation(INITIAL_STATE, validateCreateLink, handleSubmitLink);
    function handleSubmitLink() {
      console.log('submited');
    }

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        value={values.description}
        name="description"
        placeholder="A description for your link"
        autoComplete="off"
        type="text"
        className={errors.description && 'error-input'}
      />
      {errors.description && <p className='error-text'>{errors.description}</p>}
      <input
        onChange={handleChange}
        value={values.url}
        name="url"
        placeholder="The url for the link"
        autoComplete="off"
        type="text"
        className={errors.url && 'error-input'}
      />
      {errors.url && <p className='error-text'>{errors.url}</p>}
      <button className="button" type="submit">Submit</button>
    </form>
  );
}

export default CreateLink;
