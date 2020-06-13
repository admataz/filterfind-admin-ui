/**
 * hook to connect components to the document graphQL data - for initial load
 */

import { useEffect, useReducer } from "react";
import { IDocument, documentActionTypes, IUseDocumentItem } from "./types";
import documentReducer from "./documentReducer";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  GET_SKELETON_DOCUMENT_DATA,
  GET_DOCUMENT,
  SAVE_DOCUMENT,
} from "./queries";

const newDocument: IDocument = {
  id: 0,
  title: "",
  excerpt: "",
  body: "",
  related: [],
  docschema: null,
};

const useDocumentItem = (documentId: number): IUseDocumentItem => {
  const { data: loadedData, loading, error } = useQuery(GET_DOCUMENT, {
    variables: {
      only: [Number(documentId)],
    },
  });

  const [
    saveDocument,
    { data: savedData, error: saveError, loading: saveLoading },
  ] = useMutation(SAVE_DOCUMENT, {
    update: (store, { data: { saveDocument } }) => {
      const data: any = store.readQuery({ query: GET_SKELETON_DOCUMENT_DATA });
      data.document.push(saveDocument[0]);
      store.writeQuery({ query: GET_SKELETON_DOCUMENT_DATA, data });
    },
  });

  const [state, dispatch] = useReducer(documentReducer, {
    document: newDocument,
    status: {
      loading: null,
      error: null,
    },
  });

  useEffect(() => {
    if (!documentId) {
      if (savedData) {
        return dispatch({
          type: documentActionTypes.DOCUMENT_SAVE_SUCCESS,
          payload: savedData.saveDocument[0],
        });
      }
      return;
    }
    if (savedData) {
      return dispatch({
        type: documentActionTypes.DOCUMENT_SAVE_SUCCESS,
        payload: savedData.saveDocument[0],
      });
    }

    if (loadedData) {
      return dispatch({
        type: documentActionTypes.DOCUMENT_LOAD_SUCCESS,
        payload: loadedData.document[0],
      });
    }
  }, [savedData, loadedData, documentId]);

  state.saveDocument = saveDocument;
  return state;
};

export default useDocumentItem;
