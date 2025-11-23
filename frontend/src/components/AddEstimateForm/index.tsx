import css from "./index.module.scss";
import type { AddEstimateFormProps } from "./types";
import { CreateEstimateSchema } from "../../core/schemas/estimate";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { withZodSchema } from "formik-validator-zod";


export const AddEstimateForm = ({ setShowForm }: AddEstimateFormProps) => {
  return (
    <div>
      <Formik
        initialValues={{ title: "" }}
        onSubmit={(values) => console.info(values)}
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
