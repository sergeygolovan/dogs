import React, { FC } from "react";
import FormEditor from "./FormEditor";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../store";
import IPet, { PetCreateData, PetUpdateData } from "../types/pet";
import { createPet, deletePet, updatePet } from "../store/actions/pet.actions";
import AvatarUploader from "./AvatarUploader";
import CustomerSelector from "./CustomerSelector";
import TextField from "@material-ui/core/TextField";
import Rating from "@material-ui/core/Rating";
import Box from "@material-ui/core/Box";
import { Chip, Divider, MenuItem, Stack, Typography } from "@material-ui/core";
import * as Yup from "yup";
import styles from "../styles/PetFormEditor.module.css";

interface PetFormEditorProps {
  pet?: IPet | null;
  mode: "create" | "edit";
}

const PetFormEditor: FC<PetFormEditorProps> = ({ pet, mode }) => {
  const { loading } = useAppSelector((state) => state.pets);
  const { push } = useRouter();
  const dispatch = useAppDispatch();

  let initialValues: IPet;

  // Питомец не найден
  if (!pet) {
    // Устанавливаем начальные значения по умолчанию
    initialValues = {
      _id: "",
      name: "",
      sex: "",
      registrationDate: new Date().toISOString().slice(0, 10),
      avatar: "",
      rating: 0,
      breed: "",
      feed: "",
      character: "",
      diseases: "",
      comments: "",
      customer: "",
      orders: [],
    };
  } else {
    // Устанавливаем начальные значения из выбранной сущности
    initialValues = { ...pet };
  }

  // Настройка схемы валидации
  const validationSchema = Yup.object({
    name: Yup.string().required("Обязательное поле"),
    sex: Yup.string().required("Обязательное поле"),
    customer: Yup.string().required("Обязательное поле"),
    registrationDate: Yup.string().required("Обязательное поле"),
  });

  // Инициализация обработчика создания/сохранения
  const onSavePet = async (values: IPet) => {
    let hasError: boolean = false;

    // Создание записи и переход на новую страницу
    if (mode === "create") {
      let { _id, orders, ...valueToSave } = values;
      let action = await dispatch(createPet(valueToSave as PetCreateData));

      hasError = action.meta.requestStatus === "rejected";

      if (!hasError) {
        push(`/pets/${(action.payload as IPet)._id}`);
      }

      // Обновление записи
    } else if (mode === "edit") {
      let { customer, orders, ...valueToSave } = values;
      let action = await dispatch(updatePet(valueToSave as PetUpdateData));

      hasError = action.meta.requestStatus === "rejected";
    }
  };

  // Инициализация обработчика удаления
  const onDeletePet = async () => {
    if (mode === "edit") {
      let action = await dispatch(deletePet(pet!._id));

      let hasError = action.meta.requestStatus === "rejected";

      if (action.meta.requestStatus === "fulfilled") {
        push("/pets");
      }
    }
  };

  return (
    <FormEditor
      mode={mode}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSave={onSavePet}
      onDelete={onDeletePet}
      loading={loading}
    >
      {(formik) => (
        <div className={styles.container}>
          <div className={styles.avatar}>
            <AvatarUploader
              name="avatar"
              onChange={(_, file) =>
                formik.setFieldValue("avatar", file, false)
              }
              size="300px"
              value={formik.values.avatar}
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
                  <Box sx={{ ml: 2 }}>
                    {formik.values.rating &&
                      Number.parseFloat(formik.values.rating).toFixed(1)}
                  </Box>
                )}
              </Box>
            </div>
          </div>
          <div className={styles.general}>
            <div className={styles.general__grid}>
              <TextField
                fullWidth
                className={`${styles.input} ${styles.input__main}`}
                variant="standard"
                name="name"
                label="Кличка питомца"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
                error={!!formik.errors.name}
                helperText={formik.errors.name || " "}
              />

              <TextField
                className={`${styles.input}`}
                select
                fullWidth
                label="Пол"
                name="sex"
                value={formik.values.sex}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!formik.errors.sex}
                helperText={formik.errors.sex || " "}
              >
                <MenuItem value="" key="none">
                  <em>Не указан</em>
                </MenuItem>
                <MenuItem value="male" key="male">
                  Кобель
                </MenuItem>
                <MenuItem value="female" key="female">
                  Сука
                </MenuItem>
              </TextField>
            </div>

            <CustomerSelector
              name="customer"
              label="Владелец питомца"
              value={formik.values.customer}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!formik.errors.customer}
              disabled={mode === "edit"}
              helperText={
                !formik.errors.customer && mode !== "edit"
                  ? "Выберите клиента из списка"
                  : (formik.errors.customer as string)
              }
            />

            {mode === "create" && (
              <Stack direction="row" spacing={1}>
                <TextField
                  fullWidth={true}
                  className={styles.input}
                  name="registrationDate"
                  label="Дата регистрации"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.registrationDate}
                  onBlur={formik.handleBlur}
                  error={!!formik.errors.registrationDate}
                  helperText={formik.errors.registrationDate || " "}
                />
              </Stack>
            )}
            {mode === "edit" && (
              <Stack direction="row" spacing={1}>
                <Typography className={styles.text}>
                  Дата регистрации: <b>{formik.values.registrationDate}</b>
                </Typography>

                <Typography className={styles.text}>
                  Количество посещений: <b>{pet?.orders.length || 0}</b>
                </Typography>
              </Stack>
            )}
          </div>

          <div className={styles.detail}>
            <Divider className={styles.divider}>
              <Chip label="Дополнительная информация" />
            </Divider>
            <TextField
              className={styles.input}
              fullWidth
              variant="standard"
              name="breed"
              label="Порода"
              onChange={formik.handleChange}
              value={formik.values.breed}
            />

            <TextField
              className={styles.input}
              fullWidth
              variant="standard"
              name="feed"
              label="Корм"
              onChange={formik.handleChange}
              value={formik.values.feed}
            />

            <TextField
              className={styles.input}
              fullWidth
              variant="standard"
              name="character"
              label="Характер"
              onChange={formik.handleChange}
              value={formik.values.character}
            />

            <TextField
              className={styles.input}
              fullWidth
              variant="standard"
              name="diseases"
              label="Хронические заболевания"
              onChange={formik.handleChange}
              value={formik.values.diseases}
            />

            <TextField
              className={styles.input}
              fullWidth
              multiline
              minRows={6}
              name="comments"
              label="Комментарии"
              onChange={formik.handleChange}
              value={formik.values.comments}
            />
          </div>
        </div>
      )}
    </FormEditor>
  );
};

export default PetFormEditor;
