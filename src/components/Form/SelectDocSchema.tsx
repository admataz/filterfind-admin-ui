import React from "react";
import { useField } from "formik";
import { useDocumentList } from "../DocumentProvider";

interface SelectDocSchemaProps {
  name: string;
  id?: string;
  label: string;
}

const SelectDocSchema: React.FC<SelectDocSchemaProps> = ({
  id,
  label,
  ...props
}) => {
  const [field, meta] = useField(props);
  const {docschema} = useDocumentList()
  const {value, ...fieldRest} = field
  
  return (
    <>
      <label htmlFor={id || props.name}>{label}</label>
      <select value={value || ''} {...fieldRest} {...props}>
        {docschema &&
          docschema.map((option: { label: string; id: number }) => (
            <option value={option.id} key={option.id}>
              {option.id} - {option.label}
            </option>
          ))}
      </select>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default SelectDocSchema;
