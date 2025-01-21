import { useState } from "react";

interface StartHere {
  total_amount: number;
  released_amount: number;
  percent_invest: number;  
}

const GetStartHereValidation = () => {
  const validate = (values: StartHere) => {
    const errors: any = {};

    // Validação de total_amount
    if (!values.total_amount || values.total_amount <= 0) {
      errors.total_amount = "É obrigatório inserir um valor válido para a conta.";
    }

    // Validação de released_amount
    if (!values.released_amount || values.released_amount <= 0 || values.released_amount > values.total_amount) {
      errors.released_amount = "O valor liberado deve ser um valor válido e não pode ser maior que o total.";
    }

    // Validação de percent_invest
    if (!values.percent_invest || values.percent_invest < 0 || values.percent_invest > 100) {
      errors.percent_invest = "O valor do investimento deve ser uma porcentagem válida (0-100).";
    }

    return errors;
  };

  return { validate };
};

export default GetStartHereValidation;
