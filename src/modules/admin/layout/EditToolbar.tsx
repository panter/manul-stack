import React from "react";
import { SaveButton, Toolbar } from "react-admin";

const EditToolbar = (props) => {
  return (
    <>
      <Toolbar {...props} style={{ paddingTop: 10, paddingBottom: 200 }}>
        <SaveButton
          label="Speichern und Zurück"
          redirect="list"
          submitOnEnter={false}
        />
        <SaveButton
          label="Speichern"
          redirect={false}
          submitOnEnter={false}
          variant="text"
        />
      </Toolbar>

      <Toolbar
        {...props}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <SaveButton
          label="Speichern und Zurück"
          redirect="list"
          submitOnEnter={false}
        />
        <SaveButton
          label="Speichern"
          redirect={false}
          submitOnEnter={false}
          variant="text"
        />
      </Toolbar>
    </>
  );
};

export default EditToolbar;
