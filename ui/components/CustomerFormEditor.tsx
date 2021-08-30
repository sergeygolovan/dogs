import React, { FC, useState } from "react";
import FormEditor from "./FormEditor";
import { useRouter } from "next/router";
import {
  orderCollectionSelectors,
  petCollectionSelectors,
  useAppDispatch,
  useAppSelector,
} from "../store";
import ICustomer, {
  CustomerCreateData,
  CustomerUpdateData,
} from "../types/customer";
import {
  createCustomer,
  deleteCustomer,
  updateCustomer,
} from "../store/actions/customer.actions";
import AvatarUploader from "./AvatarUploader";
import TextField from "@material-ui/core/TextField";
import Rating from "@material-ui/core/Rating";
import Box from "@material-ui/core/Box";
import {
  Chip,
  Divider,
  InputAdornment,
  Stack,
  Typography,
} from "@material-ui/core";
import * as Yup from "yup";
import PetCard from "./PetCard";
import styles from "../styles/CustomerFormEditor.module.css";
import { calcCreditAmount } from "../utils/calc";
import { setFilterValues } from "../store/features/orders/orderCollection.slice";

interface CustomerFormEditorProps {
  customer?: ICustomer | null;
  mode: "create" | "edit";
}

const CustomerFormEditor: FC<CustomerFormEditorProps> = ({
  customer,
  mode,
}) => {
  const { loading, error, message } = useAppSelector(
    (state) => state.customers
  );

  const pets = useAppSelector(petCollectionSelectors.selectAll).filter((pet) => (customer?.pets || []).includes(pet._id));
  const orders = useAppSelector(orderCollectionSelectors.selectAll).filter((p) => (customer?.orders || []).includes(p._id));

  const { push } = useRouter();
  const dispatch = useAppDispatch();

  let initialValues: ICustomer;

  if (!customer) {
    // Устанавливаем начальные значения по умолчанию
    initialValues = {
      _id: "",
      name: "",
      registrationDate: new Date().toISOString().slice(0, 10),
      avatar: "",
      rating: 0,
      contacts: "",
      discount: 0,
      address: "",
      comments: "",
      pets: [],
      orders: [],
    };
  } else {
    // Устанавливаем начальные значения из выбранной сущности
    initialValues = { ...customer };
  }

  // Настройка схемы валидации
  const validationSchema = Yup.object({
    name: Yup.string().required("Обязательное поле"),
    contacts: Yup.string().required("Обязательное поле"),
    registrationDate: Yup.string().required("Обязательное поле"),
  });

  // Инициализация обработчика создания/сохранения
  const onSaveCustomer = async (values: ICustomer) => {
    // Создание записи и переход на новую страницу
    if (mode === "create") {
      let { _id, orders, pets, ...valueToSave } = values;
      let action = await dispatch(
        createCustomer(valueToSave as CustomerCreateData)
      );

      if (action.meta.requestStatus === 'fulfilled') {
        push(`/customers/${(action.payload as ICustomer)._id}`);
      }

      // Обновление записи
    } else if (mode === "edit") {
      let { pets, orders, ...valueToSave } = values;
      await dispatch(updateCustomer(valueToSave as CustomerUpdateData));
    }
  };

  // Инициализация обработчика удаления
  const onDeleteCustomer = async () => {
    if (mode === "edit") {
      const action = await dispatch(deleteCustomer(customer!._id));
      if (action.meta.requestStatus === 'fulfilled') {
        push("/customers");
      }
    }
  };

  const petsToDraw = pets.map((pet) => <PetCard key={pet._id} pet={pet} />);

  const creditAmount = calcCreditAmount(orders);

  const onNavToOrders = () => {
    dispatch(setFilterValues({
      query: customer?.name || "",
      selectedFilterId: "customer.name",
      order: "asc"
    }))

    push("/orders", undefined, {
      shallow: false
    })
  }

  return (
    <FormEditor
      mode={mode}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSave={onSaveCustomer}
      onDelete={onDeleteCustomer}
      loading={loading}
    >
      {(formik) => (
        <div className={styles.container}>
          <div className={styles.avatar}>
            <AvatarUploader
              name="avatar"
              onChange={(_, file) => formik.setFieldValue("avatar", file, false)}
              size="250px"
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
            <TextField
              className={`${styles.input} ${styles.input__main}`}
              fullWidth
              variant="standard"
              name="name"
              label="ФИО"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              error={!!formik.errors.name}
              helperText={formik.errors.name}
            />

            <TextField
              className={`${styles.input}`}
              fullWidth
              variant="standard"
              name="contacts"
              label="Контактный номер или почта"
              onChange={formik.handleChange}
              value={formik.values.contacts}
              onBlur={formik.handleBlur}
              error={!!formik.errors.contacts}
              helperText={formik.errors.contacts}
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
                  helperText={formik.errors.registrationDate}
                />
              </Stack>
            )}
            {mode === "edit" && (
              <Stack direction="row" spacing={1}>
                <Typography className={styles.text}>
                  Дата регистрации: <b>{formik.values.registrationDate}</b>
                </Typography>

                <Typography className={`${styles.text} ${styles.clickable}`} onClick={onNavToOrders}>
                  Количество заказов: <b>{customer!.orders.length}</b>
                </Typography>

                {creditAmount > 0 && <Typography className={`${styles.text} ${styles.text__warning}`}>
                  Задолженность: <b>{creditAmount}₽</b>
                </Typography>}
              </Stack>
            )}
          </div>

          <div className={`${styles.detail}`}>
            <div className={styles.detail__main}>
              <Divider className={styles.divider}>
                <Chip label="Дополнительная информация" />
              </Divider>

              <TextField
                className={`${styles.input}`}
                fullWidth
                variant="standard"
                name="address"
                label="Адрес проживания:"
                onChange={formik.handleChange}
                value={formik.values.address}
                onBlur={formik.handleBlur}
                error={!!formik.errors.address}
                helperText={formik.errors.address}
              />

              <TextField
                className={`${styles.input} ${styles.input__main}`}
                variant="standard"
                name="discount"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
                label="Cкидка (%)"
                onChange={formik.handleChange}
                value={formik.values.discount}
                onBlur={formik.handleBlur}
                error={!!formik.errors.discount}
                helperText={formik.errors.discount}
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
            {petsToDraw.length > 0 && (
              <div className={`${styles.detail__extra}`}>
                <Divider className={styles.divider}>
                  <Chip label="Питомцы" />
                </Divider>
                {petsToDraw}
              </div>
            )}
          </div>
        </div>
      )}
    </FormEditor>
  );
};

export default CustomerFormEditor;
