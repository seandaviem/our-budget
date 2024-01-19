import { useState, ChangeEvent, ChangeEventHandler } from "react";

interface FieldsType {
  [key: string] : string;
}

interface FormObject {
  fields: FieldsType;
  updateForm: ChangeEventHandler;
  resetForm: Function;
}

export function useForm(
  initialState: FieldsType
): FormObject {
  const [fields, setFields] = useState(initialState);

  return {
    fields: fields,
    updateForm: function (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
      setFields({
        ...fields,
        [event.target.name]: event.target.value,
      });
      return;
    },
    resetForm: function () {
      setFields(initialState);
      return;
    }
  };
}