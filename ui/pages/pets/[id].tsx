import React, { FC } from "react";
import MainLayout from "../../layouts/MainLayout";
import FormEditor from "../../components/FormEditor";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import {
  AppDispatch,
  useAppDispatch,
  useAppSelector,
  wrapper,
} from "../../store";
import IPet, { PetUpdateData } from "../../types/pet";
import {
  deletePet,
  fetchPet,
  updatePet,
} from "../../store/actions/pet.actions";
import { fetchCustomerCollection } from "../../store/actions/customer.actions";
import AvatarUploader from "../../components/AvatarUploader";
import CustomerSelector from "../../components/CustomerSelector";
import TextField from "@material-ui/core/TextField";
import Rating from "@material-ui/core/Rating";
import Box from "@material-ui/core/Box";
import { Chip, Divider, Stack, Typography } from "@material-ui/core";
import * as Yup from "yup";

interface PetPageProps {
  id: string;
  entity: IPet | null;
}

const PetPage: FC<PetPageProps> = ({ id, entity }) => {
  const { loading, error, message } = useAppSelector((state) => state.pets);
  const { push } = useRouter();
  const dispatch = useAppDispatch();

  if (!entity) {
    push("/pets");
    return null;
  }

  const initialValues: IPet = { ...entity };

  const validationSchema = Yup.object({
    name: Yup.string().required("Обязательное поле"),
    customer: Yup.string().required("Обязательное поле"),
    registrationDate: Yup.string().required(),
  });

  const onSavePet = async (values: IPet) => {
    let { customer, orders, ...valueToSave } = values;
    await dispatch(updatePet(valueToSave as PetUpdateData));
  };

  const onDeletePet = async () => {
    await dispatch(deletePet(id));
    push("/pets");
  };

  return (
    <MainLayout
      title={entity ? `Карточка питомца: ${entity.name}` : ""}
      onNavBack={() => push("/pets")}
    >
      <FormEditor
        mode="edit"
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSave={onSavePet}
        onDelete={onDeletePet}
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
              {!!formik.errors.name && (
                <Typography className={styles.text}>
                  <b>{formik.errors.name}</b>
                </Typography>
              )}
              <TextField
                className={`${styles.input} ${styles.input__main}`}
                fullWidth
                variant="filled"
                name="name"
                label="Кличка"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />

              <CustomerSelector
                name="customer"
                label="Владелец питомца"
                helperText="Выберите клиента из списка"
                value={formik.values.customer}
                disabled={true}
                onChange={(_: any, value: string) =>
                  formik.setFieldValue("customer", value, false)
                }
              />

              <Stack direction="row" spacing={1}>
                <Typography className={styles.text}>
                  Дата регистрации: <b>{formik.values.registrationDate}</b>
                </Typography>

                <Typography className={styles.text}>
                  Количество посещений: <b>{entity.orders.length}</b>
                </Typography>
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

export default PetPage;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(async ({ store, params }) => {
    const action = await (store.dispatch as AppDispatch)(
      fetchPet(params!.id as string)
    );

    await (store.dispatch as AppDispatch)(fetchCustomerCollection());

    let props: { id: string | null; entity: IPet | null } = {
      id: (params?.id as string) || null,
      entity: null,
    };

    if (action.meta.requestStatus !== "rejected") {
      props.entity = action.payload as IPet;
    }

    return { props };
  });
