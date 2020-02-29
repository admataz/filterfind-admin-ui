import React from "react";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { useParams } from "react-router-dom";

import DocumentList from "../DocumentList"

const GET_DOCUMENT = gql`
  query getDocument($only: [Int]) {
    document(only: $only) {
      id
      title
      excerpt
      body
      related
    }
  }
`;

const DocumentItem = () => {
  let { documentId } = useParams<{ documentId: string }>();
  const { loading, error, data } = useQuery(GET_DOCUMENT, {
    variables: {
      only: [Number(documentId)]
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!data.document.length) return <p>Document not found</p>;
  const { id, title, excerpt, body, related } = data.document[0];

  return (
    <div>
      <h1>{title}</h1>
      <p>{excerpt}</p>

        <textarea>
            {body}
        </textarea>


        <DocumentList ids={related} />

    </div>
  );
};

export default DocumentItem;
