function Validation(values) {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    if (!values.name.trim()) {
        errors.name = "Name should not be empty";
    }
    if (!values.email.trim()) {
        errors.email = "Email should not be empty";
    }
    else if (!emailPattern.test(values.email)) {
        errors.email = "Invalid email format";
    }
    if (!values.password.trim()) {
        errors.password = "Password should not be empty";
    }
    else if (!passwordPattern.test(values.password)) {
        errors.password = "Password must have at least 8 characters, including uppercase, lowercase, and numbers";
    }
    return errors;
}
export default Validation;
