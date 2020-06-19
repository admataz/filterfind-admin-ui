import React, { createContext } from "react";

import { IDocumentState } from "./types";
import { useQuery } from "@apollo/react-hooks";

import { GET_SKELETON_DOCUMENT_DATA } from "./queries";
import { ApolloError } from "apollo-boost";

interface IDocumentContext {
  data: IDocumentState | null;
  loading?: boolean;
  error?: ApolloError;
}

const defaultContext: IDocumentContext = {
  data: null,
};

export const DocumentContext = createContext<IDocumentContext>(defaultContext);

const DocumentProvider: React.FC = ({ children }) => {
  const { data: loadedData, loading, error, client } = useQuery(
    GET_SKELETON_DOCUMENT_DATA
  );
  const data = loadedData
    ? client.readQuery({ query: GET_SKELETON_DOCUMENT_DATA })
    : null;


  return (
    <DocumentContext.Provider
      value={{
        data,
        loading,
        error,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export default DocumentProvider;
