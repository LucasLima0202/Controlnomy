import { useState } from "react";
const useAddingCategoryValidation = () => {
    const [errors, setErrors] = useState({});
    const validate = (values) => {
        const errors = {};
        if (!values.name)
            errors.name = "O nome da categoria é obrigatório";
        if (!values.typing)
            errors.typing = "O tipo de categoria é obrigatório";
        return errors;
    };
    return { validate, errors };
};
export default useAddingCategoryValidation;
