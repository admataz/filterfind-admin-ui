/**
 * hook to connect components to the document graphQL data - for initial load
 */

import  { useContext } from "react";
import { DocumentContext } from "./DocumentContextProvider";
import { IDocument, IDocSchema } from "./types";

interface IUseDocumentList {
  document?: IDocument[]
  docschema?: IDocSchema[]
  status: {
    loading?: any
    error?: any
  }
}

const useDocumentList = ():IUseDocumentList => {
  const { data, loading, error } = useContext(DocumentContext);
  
  // const data = getCachedDocumentData()
  const document = data?.document
  const docschema = data?.docschema



  return {
    document, 
    docschema,
    status: {
      loading,
      error
    }
  };
};

export default useDocumentList