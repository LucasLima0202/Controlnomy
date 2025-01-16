import { useState } from "react";

interface TransactionData {
  value: number;
  type: boolean; // true = "EXPENSE", false = "GAIN"
  category: string;
  description: string;
  date: string;
}

const useAddingTransactionDateValidation = () => {
  const validate = (values: TransactionData) => {
    const errors: any = {};
    if (!values.value) errors.value = "O valor é obrigatório.";
    if (values.type === undefined) errors.type = "O tipo de transação é obrigatório.";
    if (!values.category) errors.category = "A categoria é obrigatória.";
    if (!values.description) errors.description = "A descrição é obrigatória.";
    return errors;
  };

  return { validate };
};

export default useAddingTransactionDateValidation;
