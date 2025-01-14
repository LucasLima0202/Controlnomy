import { useState } from "react";

interface CategoryData {
  name: string;
  typing: string;
}

const useAddingCategoryValidation = () => {
    const [errors, setErrors] = useState<any>({});

    const validate = (values: { name: string, typing: string }) => {
        const errors: any = {};
        if (!values.name) errors.name = "O nome da categoria é obrigatório";
        if (!values.typing) errors.typing = "O tipo de categoria é obrigatório";
        return errors;
      };
    
      return { validate, errors };
    };

export default useAddingCategoryValidation;