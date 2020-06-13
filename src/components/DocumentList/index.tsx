import React from "react";

import { Link, useParams } from "react-router-dom";

import { useDocumentList } from "../DocumentProvider";

const DocumentList = ({ ids }: { ids?: number[] }) => {
  let { schemaId } = useParams<{ schemaId: string }>();

  const { document, docschema, status } = useDocumentList();

  if (status.loading) {
    return <>Loading</>;
  }

  if (status.error) {
    return <>:( Error</>;
  }

  const currentSchema = docschema?.find((s) => s.id === +schemaId);

  return (
    <>
      <ul>
        {docschema &&
          docschema.map((ds) => (
            <li key={ds.id}>
              <Link to={`/documents/${ds.id}`}>{ds.label}</Link>
            </li>
          ))}
      </ul>

      {schemaId && (
        <>
          <Link to={`/document/create/${schemaId}`}>
            New {currentSchema?.label}
          </Link>

          <ul>
            {document &&
              document
                .filter((d) => d.docschema === +schemaId)
                .map((row) => (
                  <li key={row.id}>
                    <Link to={`/document/${row.id}`}>{row.title}</Link>
                  </li>
                ))}
          </ul>
        </>
      )}
    </>
  );
};

export default DocumentList;
