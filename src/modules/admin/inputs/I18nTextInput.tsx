import { TextInput } from "react-admin";
import { SUPPORTED_LANGS } from "../../../config/i18n";
const I18nTextInput = ({ source, label = "", ...props }) => (
  <>
    <br />
    {SUPPORTED_LANGS.map((lang) => (
      <TextInput key={lang} source={`${source}_${lang}`} {...props} />
    ))}
    <br />
  </>
);

export default I18nTextInput;
