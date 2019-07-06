import React, { useState, useContext } from 'react';
import useFormValidation from './useFormValidation';
import validateLogin from './validations/validateLogin';
import { FirebaseContext } from '../../firebase';
import { Link } from 'react-router-dom'

//Will provide the INITIAL_STATE to our custom hook(useFormValidation), so we can have reusability to the custom hook
const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
}

function Login(props) {
  const { 
    handleSubmit, 
    handleChange, 
    handleBlur, 
    values, 
    errors, 
    isSubmitting } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
  const [login, setLogin] = useState(true);
  const [firebaseError, setFirebaseError] = useState(null);
  const { firebase } = useContext(FirebaseContext);
  async function authenticateUser() {
    const { name, email, password } = values;
    try {
      login 
      ? await firebase.login(email, password)
      : await firebase.register(name, email, password);
      props.history.push('/');
    } catch(error) {
      console.error('Authentication Error', error);
      setFirebaseError(error.message);
    }
  }
  return (
    <div>
      <h2 className="mv3">{login ? "Login": "Create Account"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column">
        {!login && <input 
          onChange={handleChange}
          value={values.name}
          name="name"
          type="text" placeholder="Your name" autoComplete="off" />}
        <input 
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          name="email"
          className={errors.email && 'error-input'}
          type="email" placeholder="Your email" autoComplete="off" 
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input 
          onBlur={handleBlur}
          onChange={handleChange}   
          value={values.password}
          name="password"     
          className={errors.password && 'error-input'}
          type="password" placeholder="Your password" autoComplete="off" 
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        {firebaseError && <p className="error-text">{firebaseError}</p>}
        <div className="flex mt3">
          <button type="submit" className="button pointer mr2" 
            disabled={isSubmitting}
            style={{ background: isSubmitting ? "grey": "orange" }}
          >
            Submit
          </button>
          <button type="" className="button pointer" 
          onClick={(e) => { e.preventDefault(); return setLogin(previousLoginState => !previousLoginState)}}>
            {login ? "need to create an account?": "already have an account?"}
          </button>
        </div>
      </form>
      <div className="forgot-password">
          <Link to="/forgot">Forgot Password</Link>
      </div>
    </div>
  );
}

export default Login;
