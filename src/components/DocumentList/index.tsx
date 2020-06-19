import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import { GET_SKELETON_DOCUMENT_DATA } from "../../data//queries";
import { IDocumentState } from "../../data/types";

interface IDocumentListProps {
  type?: number[]
  find?: string
}

const DocumentList:React.FC<IDocumentListProps> = ({type, find}) => {
  
  const { data, loading, error } = useQuery<IDocumentState>(
    GET_SKELETON_DOCUMENT_DATA,
    {
      variables: {
        type,
        find
      }
    }
  );

  if (loading) {
    return <>Loading</>;
  }

  if (error) {
    return <>:( Error</>;
  }

  return (
          <ul>
            {data?.document &&
              data.document
                .map((row) => (
                  <li key={row.id}>
                    <Link to={`/document/${row.id}`}>{row.title}</Link>
                  </li>
                ))}
          </ul>
       );
};

export default DocumentList;
