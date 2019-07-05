import React, { useState, useContext } from "react";
import { FirebaseContext } from '../../firebase';


function ForgotPassword() {
  const { firebase } = useContext(FirebaseContext);
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState(null);

 async function handleResetPasswordEmail() {
    try {
      await firebase.resetPassword(resetPasswordEmail);
      setIsPasswordReset(true);
      setPasswordResetError(null);
    } catch(error) {
      console.log('Reset Password Error', error);
      setPasswordResetError(error.message);
      setIsPasswordReset(false);
    }
  }

  return (
    <div>
      <input 
        type="email" 
        className="input"
        placeholder="Please provide account email"
        onChange={event => setResetPasswordEmail(event.target.value)}
        />
      <div>
        <button className="button" onClick={() => handleResetPasswordEmail()}>Reset Password</button>
        {isPasswordReset && <p>Check your email to reset password</p>}
        {passwordResetError && <p className="error-text">{passwordResetError}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;
