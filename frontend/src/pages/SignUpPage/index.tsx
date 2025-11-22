import { apiClient } from "../../core/apiClient";
import { CreateUserSchema } from "../../core/schemas";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext/context";
import { routes } from "../routes";


export const SignUpPage = () => {
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const { setUserData } = useAppContext();

  const getTokensMutation = useMutation({
    mutationFn: apiClient.signUp,
    onSuccess: () => {
      setUserData();
      navigate(routes.getMainPage())
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  return (
    <Formik
      initialValues={{ email: "", password: "", passwordAgain: "" }}
      validate={withZodSchema(CreateUserSchema) as (v: unknown) => object}
      onSubmit={async (user, { resetForm }) => {
        setError(null);
        if (user.password !== user.passwordAgain) {
          setError("Пароли не совпадают");
          return;
        }
        await getTokensMutation.mutateAsync(user);
        resetForm();
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

        <div>
          <label htmlFor="passwordAgain">Пароль</label>
          <br />
          <Field id="passwordAgain" name="passwordAgain" type="password" />
          <ErrorMessage component="div" name="passwordAgain" />
        </div>

        {error && <div>{error}</div>}

        <button type="submit">Отправить</button>
      </Form>
    </Formik>
  );
};
