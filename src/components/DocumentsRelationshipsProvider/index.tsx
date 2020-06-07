import React, { createContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

interface IDocument {
  id: number;
  docschema: number;
  title: string;
  related: number[];
}

interface IDocSchema {
  id: number;
  label: string;
  description: string;
}

interface IDocumentRelationsResult {
  docSchema: IDocSchema[];
  document: IDocument[];
}

interface IDocumentRelationsContext {
  data?: IDocumentRelationsResult
  error?: any
  loading?: any
}

const GET_DOCUMENT_RELATIONSHIPS = gql`
    {
        docschema {
            id
            label
            description
        }
        document(limit:0){
            id
            docschema
            title
            related
        }
    }

`;

export const DocumentRelationshipsContext = createContext<IDocumentRelationsContext>({data: {docSchema: [], document: []}});

const DocumentsRelationshipsProvider: React.FC = ({ children }) => {
  const documentRelationships = useQuery<IDocumentRelationsResult>(
    GET_DOCUMENT_RELATIONSHIPS
  );

  

  return (
    <DocumentRelationshipsContext.Provider value={documentRelationships}>
      {children}
    </DocumentRelationshipsContext.Provider>
  );
};

export default DocumentsRelationshipsProvider;
