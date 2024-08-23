import { DateValue } from "@mantine/dates";
import { useState, ChangeEvent, ChangeEventHandler } from "react";

interface FieldsType {
  [key: string] : any;
}

type UpdateFormType = ({ key, value }: { key: string, value: any }) => void;

interface FormObject {
  fields: FieldsType;
  updateForm: UpdateFormType;
  resetForm: Function;
}

export function useForm(
  initialState: FieldsType
): FormObject {
  const [fields, setFields] = useState(initialState);

  return {
    fields: fields,
    updateForm: function ({key, value}: {key: string, value: any}) {
      setFields({
        ...fields,
        [key]: value,
      });
      return;
    },
    resetForm: function () {
      setFields(initialState);
      return;
    }
  };
}