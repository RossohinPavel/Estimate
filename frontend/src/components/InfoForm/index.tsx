import { apiClient } from "../../libs/apiClient";
import { CreateInfoSchema } from "../../schemas";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { withZodSchema } from "formik-validator-zod";


export const InfoForm = () => {
  const createInfoMutation = useMutation({
    mutationFn: apiClient.createAppUpdate,
    onSuccess: (data) => {
      console.info("Received: ", data);
    },
    onError: (error) => {
      console.error("Error: ", error);
    },
  });

  return (
    <Formik
      initialValues={{ title: "", content: "" }}
      onSubmit={(values) => {
        createInfoMutation.mutateAsync(values);
      }}
      validate={withZodSchema(CreateInfoSchema) as (v: unknown) => object}
    >
      <Form>
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <Field id="title" name="title" placeholder="Заголовок" />
          <ErrorMessage component="div" name="title" />
        </div>

        <div>
          <label htmlFor="content">Content</label>
          <br />
          <Field id="content" name="content" as="textarea" placeholder="Описание изменений" />
          <ErrorMessage component="div" name="content" />
        </div>

        <button type="submit">Отправить</button>
        {createInfoMutation.isPending && <div>Loading...</div>}
      </Form>
    </Formik>
  );
};
