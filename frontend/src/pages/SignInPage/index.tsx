import { ErrorMessage, Field, Form, Formik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { UserSchema } from "../../schemas";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../libs/apiClient";
import { useState } from "react";
import { Link } from "react-router-dom";
import { routes } from "../routes";


export const SignInPage = () => {
  const [error, setError] = useState<string | null>(null)

  const getTokensMutation = useMutation({
    mutationFn: apiClient.signIn,
    onSuccess: (data) => {
      console.info("Received: ", data);
    },
    onError: (error) => {
      console.log(error.message);
      setError(error.message)
    },
  })
 
  return (
    <>
      <Formik
        initialValues={{email: '', password: ''}}
        validate={withZodSchema(UserSchema) as (v: unknown) => object}
        onSubmit={async (values, { resetForm }) => {
          setError(null);
          await getTokensMutation.mutateAsync(values);
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
            <Field id='password' name='password' type='password' />
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