import { Chip, Divider, Stack, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/core/Rating";
import TextField from "@material-ui/core/TextField";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { FC } from "react";
import AvatarUploader from "../../components/AvatarUploader";
import CustomerSelector from "../../components/CustomerSelector";
import FormEditor from "../../components/FormEditor";
import MainLayout from "../../layouts/MainLayout";
import {
  AppDispatch,
  useAppDispatch,
  useAppSelector,
  wrapper,
} from "../../store";
import { fetchCustomerCollection } from "../../store/actions/customer.actions";
import { createPet } from "../../store/actions/pet.actions";
import IPet, { PetCreateData } from "../../types/pet";
import * as Yup from "yup";

const CreatePetPage: FC = () => {
  const { loading, error, message } = useAppSelector((state) => state.pets);
  const { push } = useRouter();
  const dispatch = useAppDispatch();

  const initialValues: IPet = {
    _id: "",
    name: "",
    registrationDate: new Date().toISOString().slice(0, 10),
    image: "",
    rating: 0,
    breed: "",
    feed: "",
    character: "",
    diseases: "",
    comments: "",
    customer: "",
    orders: [],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Обязательное поле"),
    customer: Yup.string().required("Обязательное поле"),
    registrationDate: Yup.string().required("Обязательное поле"),
  });

  const onCreatePet = async (values: IPet) => {
    let { _id, orders, ...valueToSave } = values;
    alert(JSON.stringify(values, null, 2));
    //let action = await dispatch(createPet(valueToSave as PetCreateData));
    //push((action.payload as IPet)._id);
  };

  return (
    <MainLayout
      title={`Создание карточки питомца`}
      onNavBack={() => push("/pets")}
    >
      <FormEditor
        mode="create"
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSave={onCreatePet}
        loading={loading}
      >
        {(formik, styles) => (
          <>
            <div className={styles.avatar}>
              <AvatarUploader
                name="image"
                onChange={(_, file) =>
                  formik.setFieldValue("image", file, false)
                }
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
                    <Box sx={{ ml: 2 }}>
                      {formik.values.rating &&
                        Number.parseFloat(formik.values.rating).toFixed(1)}
                    </Box>
                  )}
                </Box>
              </div>
            </div>
            <div className={styles.general}>
              <TextField
                className={`${styles.input} ${styles.input__main}`}
                fullWidth
                variant="filled"
                name="name"
                label="Кличка питомца"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
                error={!!formik.errors.name}
                helperText={formik.errors.name}
              />

              <CustomerSelector
                name="customer"
                label="Владелец питомца"
                value={formik.values.customer}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!formik.errors.customer}
                helperText={!formik.errors.customer ? "Выберите клиента из списка" : (formik.errors.customer as string)}
              />

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
                  helperText={formik.errors.registrationDate}
                />
              </Stack>
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
                rows={6}
                name="comments"
                label="Комментарии"
                onChange={formik.handleChange}
                value={formik.values.comments}
              />
            </div>
          </>
        )}
      </FormEditor>
    </MainLayout>
  );
};

export default CreatePetPage;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(async ({ store, params }) => {
    await (store.dispatch as AppDispatch)(fetchCustomerCollection());
  });
