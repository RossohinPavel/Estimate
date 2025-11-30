import css from "./index.module.scss";
import type { AddEstimateFormProps } from "./types";
import { apiClient } from "../../core/apiClient";
import { CreateEstimateSchema } from "../../core/schemas/estimate";
import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { withZodSchema } from "formik-validator-zod";


export const AddEstimateForm = ({ setShowForm, refetch }: AddEstimateFormProps) => {
  const createEstimateMutation = useMutation({
    mutationFn: apiClient.createEstimate,
    onSuccess: (data) => {
      console.info("Estimate succesful create. Id =", data.id);
      setShowForm(false);
      refetch();
    },
    onError: (error) => {
      console.error("Error while creating estimate:", error.message);
    },
  });

  return (
    <div>
      <Formik
        initialValues={{ title: "" }}
        onSubmit={(data, { resetForm }) => {
          createEstimateMutation.mutateAsync(data).then(() => resetForm());
        }}
        validate={withZodSchema(CreateEstimateSchema) as (v: unknown) => object}
      >
        <Form className={css["add-estimate-form"]}>
          <div>
            <Field id="title" name="title" placeholder="Введите название сметы" />
            <ErrorMessage component="div" name="title" />
          </div>
          <div className={css.actions}>
            <button type="submit">Создать</button>
            <button type="reset" onClick={() => setShowForm(false)}>
              Отмена
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
