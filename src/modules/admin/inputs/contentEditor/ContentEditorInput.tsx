import { Paper, Button } from "@material-ui/core";
import Editor from "@react-page/editor";
import React, { Fragment, useState } from "react";
import { Labeled, useInput } from "react-admin";
import { defaultSlate, plugins } from "../../../reactPage/plugins";
import InEditorContext from "./InEditorContext";
const LANGUAGES = [
  {
    lang: "en",
    label: "English",
  },
  {
    lang: "de",
    label: "Deutsch",
  },
];
const ContentEditorInput: React.FC<{
  label?: string;
  source: string;
}> = ({ label = "Content", source }) => {
  const {
    input: { value, onChange },
  } = useInput({ source });

  const [lang, setLang] = useState("en");
  return (
    <Labeled label={label} source={source} fullWidth>
      <Fragment>
        <div>
          {LANGUAGES.map((l) => (
            <Button
              variant={lang === l.lang ? "contained" : undefined}
              key={l.lang}
              onClick={() => setLang(l.lang)}
            >
              {l.label}
            </Button>
          ))}
        </div>

        <InEditorContext.Provider value={true}>
          <Paper
            elevation={5}
            style={{
              padding: 20,
              marginRight: 50,
              maxWidth: 1024,
              minWidth: 200,
            }}
          >
            <Editor
              lang={lang}
              value={value}
              languages={LANGUAGES}
              onChange={(e: any) => {
                onChange(e);
              }}
              onChangeLang={setLang}
              plugins={plugins}
              defaultPlugin={defaultSlate}
              allowMoveInEditMode
              allowResizeInEditMode
            />
          </Paper>
        </InEditorContext.Provider>
      </Fragment>
    </Labeled>
  );
};

export default ContentEditorInput;
