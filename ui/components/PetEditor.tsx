import React, { FC } from "react";
import TextField from "@material-ui/core/TextField";
import Rating from "@material-ui/core/Rating";
import styles from "../styles/PetEditor.module.css";
import { useRouter } from "next/router";
import IPet, { PetCreateData, PetUpdateData } from "../types/pet";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../store";
import { useSelector, useStore } from "react-redux";
import AvatarUploader from "./AvatarUploader";
import Button from "@material-ui/core/Button";
import {
  createPet,
  deletePet,
  fetchPet,
  updatePet,
} from "../store/actions/pet.actions";
import CustomerSelector from "./CustomerSelector";
import { redirect } from "next/dist/next-server/server/api-utils";
import { Box, LinearProgress } from "@material-ui/core";

export interface PetEditorProps {
  id: string;
  mode: "create" | "edit";
  entity: IPet | null;
}

export const PetEditor: FC<PetEditorProps> = ({ id, mode, entity }) => {
  const store = useStore();

  const { redirect, loading, error, message } = useAppSelector(
    (state) => state.pets
  );

  // console.log(`Selected id: ${id}`);
  // console.log(`Selected entity: ${JSON.stringify(entity, null, 2)}`);

  const router = useRouter();

  const dispatch = useAppDispatch();

  if (!entity && mode === "edit") {
    router.push("/pets");
  }

  if (redirect) {
    router.push(redirect);
  }

  const defaultValues: PetCreateData | PetUpdateData = Object.assign(
    {
      name: "",
      image: "",
      rating: 0,
      breed: "",
      feed: "",
      character: "",
      diseases: "",
      comments: "",
      customer: "",
      orders: [],
    },
    entity
  );

  const formik = useFormik({
    initialValues: defaultValues,
    onSubmit: (values, { setSubmitting }) => {
      if (mode === "edit") {
        dispatch(updatePet(values as PetUpdateData)).then(() => {
          setSubmitting(false);
        });
      } else {
        dispatch(createPet(values as PetCreateData)).then((action) => {
          setSubmitting(false);
          router.push(`/pets/${action.payload._id}`);
        });
      }
    },
  });

  return (
    <form className={styles.container} onSubmit={formik.handleSubmit}>
      <div className={styles.avatar}>
        <AvatarUploader
          name="image"
          onChange={(e, file) => {
            formik.setFieldValue("image", file, false);
          }}
          size="250px"
          value={formik.values.image}
        />
        <div className={styles.avatar__rating}>
          <Box
            sx={{
              placeContent: "center",
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Rating
              precision={0.5}
              value={formik.values.rating}
              onChange={(e, value) => {
                formik.setFieldValue("rating", value, false);
              }}
            />
            {formik.values.rating !== 0 && (
              <Box sx={{ ml: 2 }}>{Number.parseFloat(formik.values.rating).toFixed(1)}</Box>
            )}
          </Box>
        </div>
      </div>
      <div className={styles.general}>
        <TextField
          className={`${styles.input} ${styles.input__main}`}
          fullWidth
          name="name"
          label="Кличка"
          onChange={formik.handleChange}
          value={formik.values.name}
        />

        <TextField
          className={styles.input}
          fullWidth
          name="breed"
          label="Порода"
          onChange={formik.handleChange}
          value={formik.values.breed}
        />

        <CustomerSelector
          name="customer"
          label="Владелец питомца"
          helperText="Выберите клиента из списка"
          value={formik.values.customer}
          onChange={(e, value) => {
            formik.setFieldValue("customer", value, false);
          }}
        />
      </div>

      <div className={styles.detail}>
        <TextField
          className={styles.input}
          fullWidth
          name="feed"
          label="Корм"
          onChange={formik.handleChange}
          value={formik.values.feed}
        />

        <TextField
          className={styles.input}
          fullWidth
          name="character"
          label="Характер"
          onChange={formik.handleChange}
          value={formik.values.character}
        />

        <TextField
          className={styles.input}
          fullWidth
          name="diseases"
          label="Хронические заболевания"
          onChange={formik.handleChange}
          value={formik.values.diseases}
        />

        <TextField
          className={styles.input}
          fullWidth
          multiline
          rows={6}
          name="comments"
          label="Комментарии"
          onChange={formik.handleChange}
          value={formik.values.comments}
        />
      </div>
      <div className={styles.progress}>
        {loading ? <LinearProgress /> : null}
      </div>
      <div className={styles.toolbar}>
        {id !== "" ? (
          <Button
            className={styles.toolbar__button}
            variant="contained"
            size="large"
            color="error"
            disableElevation
            onClick={async () => {
              await dispatch(deletePet(id));
              router.push("/pets");
            }}
            disabled={loading}
          >
            Удалить
          </Button>
        ) : null}

        <Button
          className={styles.toolbar__button}
          variant="contained"
          size="large"
          color="primary"
          disableElevation
          type="submit"
          disabled={loading}
        >
          {id !== "" ? "Сохранить" : "Создать"}
        </Button>
      </div>
    </form>
  );
};

export default PetEditor;
