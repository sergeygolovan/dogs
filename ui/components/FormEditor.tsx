import styles from "../styles/FormEditor.module.css";
import { useFormik } from "formik";
import Button from "@material-ui/core/Button";
import { Backdrop, CircularProgress } from "@material-ui/core";

interface EditorProps<Entity> {
  mode: "create" | "edit";
  initialValues: Entity;
  validationSchema: any;
  loading: boolean;
  showToolbar?: boolean;
  error: boolean;
  message: string;
  onSave: (values: Entity) => Promise<void>;
  onDelete?: () => Promise<void>;
  children: (
    formik: ReturnType<typeof useFormik>
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
    showToolbar = true,
  } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await onSave(values);
      setSubmitting(false);
    },
  });

  const onDeleteRequested = async () => {
    if (onDelete) {
      await onDelete();
    }
  };

  return (
    <>
      <form className={styles.container} onSubmit={formik.handleSubmit}>
        {children(formik)}
      </form>
      {showToolbar && (
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
            onClick={formik.submitForm}
            disabled={loading || formik.isSubmitting}
          >
            {mode === "edit" ? "Сохранить" : "Создать"}
          </Button>
        </div>
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default FormEditor;
