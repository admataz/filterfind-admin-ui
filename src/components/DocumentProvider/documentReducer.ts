import { Reducer } from "react";

import {
  statusMessages,
  documentActionTypes,
  IDocument,
  IUseDocumentItem,
} from "./types";

const documentReducer: Reducer<any, any> = (
  state: IUseDocumentItem,
  action: { type: documentActionTypes; payload?: IDocument }
) => {
  switch (action.type) {
    case documentActionTypes.DOCUMENT_LOAD:
    case documentActionTypes.DOCUMENT_SAVE:
      return {
        document: null,
        status: {
          loading: true,
          error: null,
        },
      };

    case documentActionTypes.DOCUMENT_LOAD_SUCCESS:
    case documentActionTypes.DOCUMENT_SAVE_SUCCESS:
      return {
        document: action.payload,
        status: {
          loading: false,
          error: null,
        },
      };

    case documentActionTypes.DOCUMENT_LOAD_ERROR:
      return {
        document: null,
        status: {
          loading: false,
          error: statusMessages.LOAD_ERROR,
        },
      };

    case documentActionTypes.DOCUMENT_SAVE_ERROR:
      return {
        document: null,
        status: {
          loading: false,
          error: statusMessages.LOAD_ERROR,
        },
      };
  }
};

export default documentReducer;
