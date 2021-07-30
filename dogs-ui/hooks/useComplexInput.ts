import React, { useState } from "react";

export function useComplexInput<T> (initialValue: T) {
  const [values, setValues] = useState(initialValue);

  const onChange = (fieldName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({...values, [fieldName]: e.target.value})
  };


  const register = (fieldName: keyof T & string) => {
    return {
        name: fieldName,
        value: values[fieldName],
        onChange: onChange.bind(null, fieldName)
    }
  }

  return {
    values,
    register,
  };
};