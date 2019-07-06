export default function validateCreateLink(values) {
    let errors = {};

    const isLinkValid = /^(ftp|http|https):\/\/[^ "]+$/.test(values.url); 

    //Description errors
    if(!values.description) {
        errors.description = 'Description is required';
    } else if(values.description.length < 10) {
        errors.description = 'Description must be at least 10 characters';
    }

    //Url errors
    if(!values.url) {
        errors.url = 'Url is required';
    }
    else if(!isLinkValid) {
        errors.url = 'URL must be valid';
    }

    return errors;
}
