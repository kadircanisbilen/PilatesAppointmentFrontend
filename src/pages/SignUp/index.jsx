import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { signUp } from "./api";
import { Input } from "./components/Input";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "../../shared/components/LanguageSelector";

export function SignUp() {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordRepeat, setPasswordRepeat] = useState();
  const [apiProgress, setApiProgress] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    setErrors(function (lastErrors) {
      return {
        ...lastErrors,
        email: undefined,
      };
    });
  }, [email]); //If email changes, set errors to blank.

  useEffect(() => {
    setErrors(function (lastErrors) {
      return {
        ...lastErrors,
        name: undefined,
      };
    });
  }, [name]); //If name changes, set errors to blank.

  useEffect(() => {
    setErrors(function (lastErrors) {
      return {
        ...lastErrors,
        surname: undefined,
      };
    });
  }, [surname]); //If surname changes, set errors to blank.

  useEffect(() => {
    setErrors(function (lastErrors) {
      return {
        ...lastErrors,
        password: undefined,
      };
    });
  }, [password]); //If password changes, set errors to blank.

  useEffect(() => {
    setErrors(function (lastErrors) {
      return {
        ...lastErrors,
        passwordRepeat: undefined,
      };
    });
  }, [passwordRepeat]); //If passwordRepeat changes, set errors to blank.

  const onSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage();
    setGeneralError();
    setApiProgress(true);
    try {
      const response = await signUp({
        name,
        surname,
        email,
        password,
      });
      setSuccessMessage(response.data.message);
    } catch (axiosError) {
      if (
        axiosError.response?.data &&
        axiosError.response.data.status === 400
      ) {
        setErrors(axiosError.response.data.validationErrors);
      } else {
        setGeneralError(t("genericError"));
      }
    } finally {
      setApiProgress(false);
    }
  };

  const passwordMatchError = useMemo(() => {
    if (password && password !== passwordRepeat) {
      return t("passwordMissmatch");
    }
  }, [password, passwordRepeat]); // Only if password or passwordRepeat fields changes, then check. Don't check every time. (For performance)

  return (
    <div className="container">
      <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
        <form className="card" onSubmit={onSubmit}>
          <div className="card-header text-center">
            <h1>{t("signUp")}</h1>
          </div>
          <div className="card-body">
            <Input
              id="name"
              label={t("name")}
              error={errors.name}
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              id="surname"
              label={t("surname")}
              error={errors.surname}
              onChange={(event) => setSurname(event.target.value)}
            />
            <Input
              id="email"
              label={t("email")}
              error={errors.email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              id="password"
              label={t("password")}
              error={errors.password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />
            <Input
              id="passwordRepeat"
              label={t("passwordRepeat")}
              error={passwordMatchError}
              onChange={(event) => setPasswordRepeat(event.target.value)}
              type="password"
            />
            {successMessage && (
              <div className="alert alert-success"> {successMessage}</div>
            )}
            {generalError && (
              <div className="alert alert-danger"> {generalError}</div>
            )}
            <div className="text-center">
              <button
                className="btn btn-primary"
                disabled={
                  apiProgress || !password || password !== passwordRepeat
                }
              >
                {apiProgress && (
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                )}
                {t("signUp")}
              </button>
            </div>
          </div>
        </form>
        <LanguageSelector />
      </div>
    </div>
  );
}
