import React, { useState } from "react";

function Login(props) {
  const [login, setLogin] = useState(true);
  return (
    <div>
      <h2 className="mv3">{login ? "Login": "Create Account"}</h2>
      <form className="flex flex-column">
        {!login && <input type="text" placeholder="Your name" autoComplete="off" />}
        <input type="email" placeholder="Your email" autoComplete="off" />
        <input type="password" placeholder="Your password" autoComplete="off" />
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
