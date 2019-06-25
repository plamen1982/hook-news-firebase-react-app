export default function validateLogin(values) {
    let errors = {};

    const isEmailtValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email); 
    if(!values.email) {
        errors.email = 'Email is required';
    } else if(!isEmailtValid) {
        errors.email = 'Email is not valid';
    }
    if(!values.password) {
        errors.password = 'Password is required';
    }
    else if(values.password.length < 6) {
        errors.password = 'Password should at lease 6 characters';
    }

    return errors;
}
