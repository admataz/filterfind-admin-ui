import React, { useContext } from "react";
import { useField } from "formik";

import { useDocumentList } from "../DocumentProvider";

interface SelectRelatedDocumentsProps {
  name: string;
  id?: string;
  label: string;
}

const RelatedDocuments: React.FC<SelectRelatedDocumentsProps> = ({
  id,
  label,
  ...props
}) => {
  const { documents: allDocuments } = useDocumentList();

  console.log(allDocuments);
  return (
    <>
      <label htmlFor={id || props.name}>{label}</label>
    </>
  );
};

export default RelatedDocuments;
