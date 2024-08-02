import { useState } from "react";
import { ZodError, ZodSchema } from "zod";

interface Field<T> {
  name: keyof T;
  value: T[keyof T];
  schema: ZodSchema<T[keyof T]>;
}

interface FormState<T> {
  [key: string]: T[keyof T];
}

function useForm<T extends Record<string, any>>(fields: Field<T>[]) {
  let formStateInit: FormState<T> = {};
  fields.forEach((field) => {
    formStateInit[field.name as string] = field.value;
  });

  const [formState, setFormState] = useState<FormState<T>>(formStateInit);

  const validFieldNames = fields.map((field) => field.name);

  const setValue = (name: keyof T, value: T[keyof T]) => {
    if (validFieldNames.includes(name)) {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      console.error(`Invalid field name: ${String(name)}`);
    }
  };

  const getValue = (name: keyof T): T[keyof T] => {
    return formState[name as string];
  };

  const reset = () => {
    setFormState(formStateInit);
  };

  const errors: string[] = [];

  const validate = (onSuccess: (formData: FormState<T>) => void): boolean => {
    let isValid = true;
    for (const field of fields) {
      if (field.schema.isOptional()) {
        continue;
      }
      try {
        field.schema.parse(formState[field.name as string]);
      } catch (error) {
        if (error instanceof ZodError) {
          errors.push(
            error.errors[0].message ||
              `${error.errors[0].path.join(".")} is invalid`
          );
        }
        isValid = false;
      }
    }
    if (isValid) {
      onSuccess(formState);
      return isValid;
    } else {
      console.log({
        title: errors[0],
        type: "error",
      });
      return isValid;
    }
  };

  return {
    setFormValue: setValue,
    getFormValue: getValue,
    resetForm: reset,
    formState,
    validateForm: validate,
  };
}

export default useForm;