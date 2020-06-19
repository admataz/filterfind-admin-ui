import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import { GET_SKELETON_DOCUMENT_DATA, GET_DOCSCHEMA } from "../../data/queries";
import { IDocumentState } from "../../data/types";
import DocumentList from "../../components/DocumentList";

const DocumentsPage = () => {
  let { schemaId } = useParams<{ schemaId: string }>();

  const { data, loading, error } = useQuery<IDocumentState>(
    GET_SKELETON_DOCUMENT_DATA
  );
  const { data: schemaData } = useQuery(GET_DOCSCHEMA);

  useEffect(() => {
    console.log(schemaData);
  }, [schemaData]);

  if (loading) {
    return <>Loading</>;
  }

  if (error) {
    return <>:( Error</>;
  }

  const currentSchema = data?.docschema.find((s) => s.id === +schemaId);

  return (
    <>
      <ul>
        {data?.docschema &&
          data.docschema.map((ds) => (
            <li key={ds.id}>
              <Link to={`/documents/${ds.id}`}>{ds.label}</Link>
            </li>
          ))}
      </ul>

      <>
        <Link to={`/document/create/${schemaId||''}`}>
          New {currentSchema?.label}
        </Link>

        {currentSchema && <DocumentList type={[currentSchema.id]} />}
      </>
    </>
  );
};

export default DocumentsPage;
