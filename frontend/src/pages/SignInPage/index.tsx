import { apiClient } from "../../core/apiClient";
import { UserAuthSchema } from "../../core/schemas";
import { routes } from "../routes";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext/context";


export const SignInPage = () => {
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const { setUserData } = useAppContext();

  const authorizeUser = useMutation({
    mutationFn: apiClient.signIn,
    onSuccess: () => {
      setUserData();
      navigate(routes.getMainPage());
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={withZodSchema(UserAuthSchema) as (v: unknown) => object}
        onSubmit={async (values) => {
          setError(null);
          await authorizeUser.mutateAsync(values);
        }}
      >
        <Form>
          <div>
            <label htmlFor="email">Email</label>
            <br />
            <Field id="email" name="email" />
            <ErrorMessage component="div" name="email" />
          </div>

          <div>
            <label htmlFor="password">Пароль</label>
            <br />
            <Field id="password" name="password" type="password" />
            <ErrorMessage component="div" name="password" />
          </div>

          {error && <div>{error}</div>}

          <button type="submit">Отправить</button>
        </Form>
      </Formik>
      <div>
        <Link to={routes.getSignUpPage()}>Регистрация</Link>
      </div>
    </>
  );
};
