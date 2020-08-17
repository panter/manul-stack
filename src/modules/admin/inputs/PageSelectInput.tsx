import React from "react";
import { AutocompleteInput, ReferenceInput } from "react-admin";
import styled from "styled-components";
const Base = styled.div`
  & > div > div {
    width: 100%;
  }
`;
export default ({
  label = "Page",
  source,
  ...rest
}: {
  source?: string;
  label?: string;
  onChange?: any;
  maxPageDepth?: number;
  meta?: any;
  input?: any;
}) => {
  return (
    <Base>
      <ReferenceInput
        label={label}
        source={source}
        reference="Page"
        allowEmpty
        sort={{ field: "path", order: "ASC" }}
        filterToQuery={(searchText) => ({
          OR: [{ path: searchText }, { htmlTitle: searchText }],
        })}
        {...rest}
      >
        <AutocompleteInput
          options={{
            suggestionsContainerProps: {
              style: { zIndex: 2000 },
            },
          }}
          optionText={"path"}
          emptyValue={null}
          matchSuggestion={() => true}
        />
      </ReferenceInput>
    </Base>
  );
};
