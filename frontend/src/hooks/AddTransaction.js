const useAddingTransactionValidation = () => {
    const validate = (values) => {
        const errors = {};
        if (!values.value)
            errors.value = "O valor é obrigatório.";
        if (values.type === undefined)
            errors.type = "O tipo de transação é obrigatório.";
        if (!values.category)
            errors.category = "A categoria é obrigatória.";
        if (!values.description)
            errors.description = "A descrição é obrigatória.";
        return errors;
    };
    return { validate };
};
export default useAddingTransactionValidation;
