/**
 * hook to connect components to the document graphQL data - for initial load
 */

import { useContext } from "react";

import { useLazyQuery } from "@apollo/react-hooks";

import { DocumentContext } from "./DocumentContextProvider";
import { IDocument, IDocSchema } from "./types";

import {
  GET_DOCUMENT_ITEMS_DATA
} from "./queries";

interface IUseDocumentList {
  documents?: IDocument[];
  docschema?: IDocSchema[];
  status: {
    loading?: any;
    error?: any;
  };
}

const useDocumentList = (): IUseDocumentList => {
  const { data, loading, error } = useContext(DocumentContext);

  // const data = getCachedDocumentData()
  const documents = data?.document;
  const docschema = data?.docschema;

  // const 



  return {
    documents,
    docschema,
    status: {
      loading,
      error,
    },
  };
};

export default useDocumentList;
