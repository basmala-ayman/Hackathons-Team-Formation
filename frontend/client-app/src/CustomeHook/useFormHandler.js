import { useState } from "react";

export const useFormHandler = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (field, setter) => (e) => {
    const value = e.target.value;

    if (setter) {
      setter(value);
    }

    setValues((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleChange,
  };
};
