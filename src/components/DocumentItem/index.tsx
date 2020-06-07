import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Formik, Form, FormikHelpers } from "formik";

import TextField from "../Form/TextField";
import Breadcrumb from "../Breadcrumb";
import SelectDocSchema from "../Form/SelectDocSchema";
import validationSchema from "./validation";
import RelatedDocuments from "../Form/RelatedDocuments"
import useDocumentItem from "../DocumentProvider/useDocumentItem";
import useDocumentList from "../DocumentProvider/useDocumentList";
import {IDocument} from '../DocumentProvider/types'

interface IRouteParams {
  documentId?: string
  schemaId?: string
}

const StyledBreadcrumb = styled(Breadcrumb)``;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;
;
const StyledInputRow = styled('div')`
  margin: 8px;
  border: 1px solid #ccc;
  padding: 8px;
  box-shadow: 4px 4px 4px #efefef;

`;

const DocumentItem = () => {
  let { documentId = 0, schemaId } = useParams<IRouteParams>();
  let history = useHistory();
  
  const {saveDocument, document, status: {error, loading}} = useDocumentItem(+documentId)
  const {document: documentList, docschema} = useDocumentList()


  useEffect(() => {
    if(document?.id && !documentId){
      history.push(`/document/${document.id}`)
    } 
  }, [document, history, documentId])
  
  if(schemaId && document){
    document.docschema = +schemaId
  }

  const currentSchema = docschema?.find(s => s.id===document?.docschema)

  const handleSubmit = async (
    docData: IDocument,
    { setSubmitting }: FormikHelpers<IDocument>
  ) => {
    setSubmitting(false);
    const { __typename, ...document } = docData;

    if (document.docschema) {
      document.docschema = +document.docschema;
    }
    await saveDocument({ variables: { document } });
  };

  if (loading && !document) return <p>Loading...</p>;
  if (documentId && !document) return <p>Document not found</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <StyledBreadcrumb
        links={[
          {
            label: "Dashboard",
            url: "/"
          },
          {
            label: "Documents",
            url: "/documents"
          },
          {
            label: currentSchema?.label || '',
            url: `/documents/${currentSchema?.id}`
          }
        ]}
        current={document?.title || ''}
      />
      

{document && 
      <Formik
        onSubmit={handleSubmit}
        initialValues={document || {}}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <StyledForm>
            <StyledInputRow>
              <SelectDocSchema
                name="docschema"
                label="Select Doc Schema"
              />
            </StyledInputRow>
            <StyledInputRow>
              <TextField id="title" name="title" label="Title" />
            </StyledInputRow>
            <StyledInputRow>
              <TextField multiline name="excerpt" label="Excerpt" />
            </StyledInputRow>
            <StyledInputRow>
              <TextField multiline name="body" label="Body" />
            </StyledInputRow>

            <StyledInputRow>
              <RelatedDocuments />
            </StyledInputRow>
            
            <StyledInputRow>
              <button disabled={isSubmitting}>
                Save
              </button>
            </StyledInputRow>
          </StyledForm>
        )}
      </Formik>

        }
      {/* <div className="status">{statusMessage}</div> */}
    </>
  );
};

export default DocumentItem;
