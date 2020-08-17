import React from "react";
import { SaveButton, Toolbar } from "react-admin";
import styled from "styled-components";
import mediaQueries from "../../../utils/mediaQueries";

const FixedToolbarWrapper = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: none;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
  ${mediaQueries.tablet`
    display: block;
  `}
  & > * {
    margin-top: 0px !important;
  }
`;

const OtherToolbar = styled.div`
  ${mediaQueries.tablet`
    & > * {

    padding-bottom: 200px;
  }
  `}
`;
const EditToolbar: React.ComponentType<{
  additionalSaveAction?: {
    label: string;
    onSuccess: () => void;
  };
}> = ({ children, additionalSaveAction, ...props }) => {
  const saveAndBack = (
    <SaveButton label="Save and Back" redirect="list" submitOnEnter={false} />
  );

  const save = (
    <SaveButton
      label="Save"
      redirect={false}
      submitOnEnter={false}
      variant="text"
    />
  );
  const additional = additionalSaveAction ? (
    <SaveButton
      label={additionalSaveAction.label}
      redirect={false}
      submitOnEnter={false}
      variant="text"
      onSuccess={additionalSaveAction.onSuccess}
    />
  ) : null;
  return (
    <>
      <OtherToolbar>
        <Toolbar {...props}>
          {saveAndBack} {save} {additional} {children}
        </Toolbar>
      </OtherToolbar>
      <FixedToolbarWrapper>
        <Toolbar {...props}>
          {saveAndBack} {save} {additional} {children}
        </Toolbar>
      </FixedToolbarWrapper>
    </>
  );
};

export default EditToolbar;
