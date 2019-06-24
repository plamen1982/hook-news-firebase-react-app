import React, { useState } from 'react';
import useFormValidation from './useFormValidation';


//Will provide the INITIAL_STATE to our custom hook(useFormValidation), so we can have reusability to the custom hook
const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
}

function Login(props) {
  const { handleChange, handleSubmit, values } = useFormValidation(INITIAL_STATE);
  const [login, setLogin] = useState(true);
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
          onChange={handleChange}
          value={values.email}
          name="email"
          type="email" placeholder="Your email" autoComplete="off" />
        <input 
          onChange={handleChange}   
          value={values.password}
          name="password"     
          type="password" placeholder="Your password" autoComplete="off" />
        <div className="flex mt3">
          <button type="" className="button pointer mr2">
            Submit
          </button>
          <button type="" className="button pointer" 
          onClick={(e) => { e.preventDefault(); return setLogin(previousLoginState => !previousLoginState)}}>
            {login ? "need to create an account?": "already have an account?"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
