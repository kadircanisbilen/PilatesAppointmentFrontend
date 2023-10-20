import { useTranslation } from "react-i18next";

export function LanguageSelector() {

    const {i18n} = useTranslation();

    const onSelectLanguage = (language) => {
        i18n.changeLanguage(language)
        localStorage.setItem('lang', language)
    }
  return (
    <>
      <img
        role="button"
        src="https://flagcdn.com/28x21/tr.png"
        width="28"
        height="21"
        alt="Türkçe"
        onClick={() => onSelectLanguage('tr')}
      ></img>
      <img
        role="button"
        src="https://flagcdn.com/28x21/us.png"
        width="28"
        height="21"
        alt="English"
        onClick={() => onSelectLanguage('en')}
      ></img>
    </>
  );
}
