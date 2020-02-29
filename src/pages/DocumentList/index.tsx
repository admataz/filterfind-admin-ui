import React from "react";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";

const GET_DOCUMENTS = gql`
  query getDocuments($only: [Int]) {
    document(only: $only) {
      id
      title
    }
  }
`;

const DocumentList = ({ ids }: {ids?: number[]}) => {
  const { loading, error, data } = useQuery(GET_DOCUMENTS, {
      variables: {
          only: ids
      }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.document.map((doc: any) => {
    return (
      <div>
        <Link to={`/document/${doc.id}`}>{doc.title}</Link>
      </div>
    );
  });
};

export default DocumentList;
