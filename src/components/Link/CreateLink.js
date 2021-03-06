import React, { useContext } from "react";
import useFormValidation from '../Auth/useFormValidation';
import validateCreateLink from '../Auth/validations/validateCreateLink';
import FirebaseContext from '../../firebase/context';

const INITIAL_STATE = {
  description: '',
  url: ''
}

function CreateLink(props) {
  const { firebase: { db }, user } = useContext(FirebaseContext);

  const { 
    handleSubmit, 
    handleChange, 
    values, 
    errors
    } = useFormValidation(INITIAL_STATE, validateCreateLink, handleSubmitLink);
    function handleSubmitLink() {
      if(!user) {
        props.history.push('/login');
      } else {
        const { description, url } = values;
        const newLink = {
          url,
          description,
          postedBy: {
            id: user.uid,
            name: user.displayName
          },
          voteCount: 0,
          votes: [],
          comments: [],
          created: Date.now()
        }
        db.collection('links').add(newLink);
        props.history.push('/');
      }
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
        type="url"
        className={errors.url && 'error-input'}
      />
      {errors.url && <p className='error-text'>{errors.url}</p>}
      <button className="button" type="submit">Submit</button>
    </form>
  );
}

export default CreateLink;
