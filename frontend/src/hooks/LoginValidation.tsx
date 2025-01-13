interface FormValues {
    email: string;
    password: string;
  }
  
  function Validation(values: FormValues): Partial<FormValues> {
    const error: Partial<FormValues> = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!values.email.trim()) {
      error.email = "O email não pode estar vazio";
    } else if (!emailPattern.test(values.email)) {
      error.email = "Formato de email inválido";
    }
  
    if (!values.password.trim()) {
      error.password = "A senha não pode estar vazia";
    }
  
    return error;
  }
  
  export default Validation;
  