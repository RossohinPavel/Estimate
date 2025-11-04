import { useFormik } from "formik";


export const InfoForm = () => {
  const formik = useFormik({
    initialValues: { title: "", content: "" },
    // validate: withZodSchema(CreateInfoSchema),
    onSubmit: (values) => {
      console.info("Submited", values);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
      }}
    >
      <div>
        <label htmlFor="title">Title</label>
        <br />
        <input
          id="title"
          type="text"
          name="title"
          value={formik.values["title"]}
          onChange={(e) => formik.setFieldValue("title", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <br />
        <textarea
          id="content"
          name="content"
          value={formik.values["content"]}
          onChange={(e) => formik.setFieldValue("content", e.target.value)}
        />
      </div>
      <button type="submit">Отправить</button>
    </form>
  );
};
