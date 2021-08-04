import React, { useState } from "react";
import styles from "../styles/FormEditor.module.css";
import { FormikValues, useFormik } from "formik";
import Button from "@material-ui/core/Button";
import { Alert, LinearProgress, Snackbar } from "@material-ui/core";

interface EditorProps<Entity> {
  mode: "create" | "edit";
  initialValues: Entity;
  validationSchema: any;
  loading: boolean;
  error: boolean;
  message: string;
  onSave: (values: Entity) => Promise<void>;
  onDelete?: () => Promise<void>;
  children: (
    formik: ReturnType<typeof useFormik>,
    styles: any
  ) => React.ReactNode;
}

export const FormEditor = <Entity,>(props: EditorProps<Entity>) => {
  const {
    mode,
    initialValues,
    validationSchema,
    onSave,
    onDelete,
    loading,
    error,
    message,
    children,
  } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await onSave(values);
      setIsToastOpen(true);
      setSubmitting(false);
    },
  });

  const onDeleteRequested = async () => {
    if (onDelete) {
      await onDelete();
      setIsToastOpen(true);
    }
  };

  const [isToastOpen, setIsToastOpen] = useState(false);
  const onToastClose = () => setIsToastOpen(false);

  return (
    <form className={styles.container} onSubmit={formik.handleSubmit}>
      {children(formik, styles)}
      <div className={styles.toolbar}>
        {mode === "edit" && (
          <Button
            className={styles.toolbar__button}
            variant="contained"
            size="large"
            color="error"
            disableElevation
            onClick={onDeleteRequested}
            disabled={loading}
          >
            Удалить
          </Button>
        )}

        <Button
          className={styles.toolbar__button}
          variant="contained"
          size="large"
          color="primary"
          disableElevation
          type="submit"
          disabled={loading}
        >
          {mode === "edit" ? "Сохранить" : "Создать"}
        </Button>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={isToastOpen}
          autoHideDuration={3000}
          onClose={onToastClose}
        >
          <Alert severity={error ? "error" : "success"} onClose={onToastClose}>{message}</Alert>
        </Snackbar>
      </div>
    </form>
  );
};

export default FormEditor;
