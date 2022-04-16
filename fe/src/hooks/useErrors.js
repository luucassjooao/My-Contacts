import { useState } from 'react';

export default function useErrors() {
  const [errors, setErrors] = useState([]);

  function setError({ field, message }) {
    const errorAlredyExists = errors.find((error) => error.field === field);

    if (errorAlredyExists) {
      return;
    }

    setErrors((prevState) => [
      ...prevState,
      { field, message },
    ]);
  }

  function removeError(fieldName) {
    setErrors((prevState) => prevState.filter(
      (error) => error.field !== fieldName,
    ));
  }

  // eslint-disable-next-line max-len
  const getErrorMessageByFieldName = (fieldName) => errors.find((error) => error.field === fieldName)?.message;

  return {
    errors, setError, removeError, getErrorMessageByFieldName,
  };
}
