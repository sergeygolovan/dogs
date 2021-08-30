import React, { FC, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import FormEditor from "./FormEditor";
import { useRouter } from "next/router";
import {
  customerCollectionSelectors,
  petCollectionSelectors,
  useAppDispatch,
  useAppSelector,
} from "../store";
import IOrder, { OrderCreateData, OrderUpdateData } from "../types/order";
import {
  createOrder,
  deleteOrder,
  updateOrder,
} from "../store/actions/order.actions";
import AvatarUploader from "./AvatarUploader";
import TextField from "@material-ui/core/TextField";
import Rating from "@material-ui/core/Rating";
import Box from "@material-ui/core/Box";
import {
  Button,
  Chip,
  Divider,
  InputAdornment,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import * as Yup from "yup";
import styles from "../styles/OrderFormEditor.module.css";
import CustomerSelector from "./CustomerSelector";
import PetSelector from "./PetSelector";
import { calcDays, calcPrice } from "../utils/calc";

interface OrderFormEditorProps {
  order?: IOrder | null;
  mode: "create" | "edit";
}

const OrderFormEditor: FC<OrderFormEditorProps> = ({ order, mode }) => {
  const { loading } = useAppSelector((state) => state.orders);
  const allCustomers = useAppSelector(customerCollectionSelectors.selectAll);
  const allPets = useAppSelector(petCollectionSelectors.selectAll);

  const { push } = useRouter();
  const dispatch = useAppDispatch();

  let initialValues: IOrder;

  if (!order) {
    // Устанавливаем начальные значения по умолчанию
    initialValues = {
      _id: "",
      status: 0,
      dateTimeFrom: new Date().toISOString().slice(0, 16),
      dateTimeTo: new Date().toISOString().slice(0, 16),
      rate: 0,
      discount: 0,
      customer: "",
      pets: [],
      deposit: 0,
      comments: "",
      createdAt: new Date(),
      updatedAt: new Date()
    };
  } else {
    // Устанавливаем начальные значения из выбранной сущности
    initialValues = { ...order };
  }

  // Настройка схемы валидации
  const validationSchema = Yup.object({
    rate: Yup.number().required("Обязательное поле"),
    dateTimeFrom: Yup.date().required("Обязательное поле"),
    dateTimeTo: Yup.date().required("Обязательное поле"),
    customer: Yup.string().required("Обязательное поле"),
    pets: Yup.array()
      .of(Yup.string())
      .min(1, "Требуется указать хотя бы одного питомца"),
  });

  // Инициализация обработчика создания/сохранения
  const onSaveOrder = async (values: IOrder) => {
    // Создание записи и переход на новую страницу
    if (mode === "create") {
      let { _id, ...valueToSave } = values;
      let action = await dispatch(createOrder(valueToSave as OrderCreateData));

      if (action.meta.requestStatus === "fulfilled") {
        push(`/orders/${(action.payload as IOrder)._id}`);
      }

      // Обновление записи
    } else if (mode === "edit") {
      let {
        pets,
        customer,
        rate,
        discount,
        dateTimeFrom,
        dateTimeTo,
        createdAt,
        updatedAt,
        ...valueToSave
      } = values;
      await dispatch(updateOrder(valueToSave as OrderUpdateData));
    }
  };

  // Инициализация обработчика удаления
  const onDeleteOrder = async () => {
    if (mode === "edit") {
      const action = await dispatch(deleteOrder(order!._id));
      if (action.meta.requestStatus === "fulfilled") {
        push("/orders");
      }
    }
  };

  const steps = [
    "Выбор клиента",
    "Выбор питомцев",
    "Выбор дат",
    "Формирование заказа",
  ];

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  

  return (
    <FormEditor
      mode={mode}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSave={onSaveOrder}
      onDelete={onDeleteOrder}
      loading={loading}
      showToolbar={activeStep === steps.length - 1 || mode === "edit"}
    >
      {(formik) => (
        <div className={styles.container}>
          {mode === "create" && (
            <Stepper activeStep={activeStep} orientation="horizontal">
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          )}
          <div className={styles.content}>
            {mode === "edit" && (
              <>
                <Typography className={`${styles.text}`} color="text.primary">
                <b>Идентификатор заказа:</b> {formik.values._id}
                </Typography>
                <Typography className={styles.text} color="text.primary">
                  <b>Дата создания заказа:</b> {new Date(formik.values.createdAt).toLocaleString()}
                </Typography>
                <Typography className={styles.text} color="text.primary">
                  <b>Дата обновления заказа:</b> {new Date(formik.values.updatedAt).toLocaleString()}
                </Typography>
              </>
            )}
            <CustomerSelector
              name="customer"
              label="Владелец питомца"
              value={formik.values.customer}
              onChange={(e) => {
                formik.setFieldValue("customer", e.target.value, true);

                if (e.target.value) {
                  let customer = allCustomers.find(
                    (c) => c._id == e.target.value
                  );
                  formik.setFieldValue("discount", customer?.discount, false);
                }
              }}
              onBlur={formik.handleBlur}
              error={!!formik.errors.customer}
              disabled={mode === "edit"}
              helperText={
                !formik.errors.customer && mode !== "edit"
                  ? "Выберите клиента из списка"
                  : (formik.errors.customer as string)
              }
            />
            {(activeStep > 0 || mode === "edit") && (
              <PetSelector
                name="pets"
                label="Питомцы"
                pets={
                  formik.values.customer
                    ? allPets.filter(
                        (p) => p.customer === formik.values.customer
                      )
                    : []
                }
                value={formik.values.pets}
                onChange={(selectedIds) => {
                  formik.setFieldValue("pets", selectedIds);
                }}
                onBlur={formik.handleBlur}
                error={!!formik.errors.pets}
                disabled={mode === "edit"}
                helperText={
                  !formik.errors.pets && mode !== "edit"
                    ? "Выберите питомцев из списка"
                    : (formik.errors.pets as string)
                }
              />
            )}
            {(activeStep > 1 || mode === "edit") && (
              <>
                <TextField
                  fullWidth={true}
                  className={styles.input}
                  name="dateTimeFrom"
                  disabled={mode === "edit"}
                  label="Планируемая дата и время приезда"
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.dateTimeFrom}
                  onBlur={formik.handleBlur}
                  error={!!formik.errors.dateTimeFrom}
                  helperText={formik.errors.dateTimeFrom}
                />
                <TextField
                  fullWidth={true}
                  className={styles.input}
                  name="dateTimeTo"
                  disabled={mode === "edit"}
                  label="Планируемая дата и время отъезда"
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.dateTimeTo}
                  onBlur={formik.handleBlur}
                  error={!!formik.errors.dateTimeTo}
                  helperText={formik.errors.dateTimeTo}
                />
              </>
            )}
            {(activeStep > 2 || mode === "edit") && (
              <>
                <Stack direction="row" justifyContent="flex-start">
                  <TextField
                    className={`${styles.input} ${styles.input__main}`}
                    variant="standard"
                    name="rate"
                    type="number"
                    disabled={mode === "edit"}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">₽</InputAdornment>
                      ),
                    }}
                    label="Цена за день (₽)"
                    onChange={formik.handleChange}
                    value={formik.values.rate}
                    onBlur={formik.handleBlur}
                    error={!!formik.errors.rate}
                    helperText={formik.errors.rate}
                  />
                  <TextField
                    className={`${styles.input} ${styles.input__main}`}
                    variant="standard"
                    name="discount"
                    type="number"
                    disabled={mode === "edit"}
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
                    className={`${styles.input} ${styles.input__main}`}
                    variant="standard"
                    name="deposit"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">₽</InputAdornment>
                      ),
                    }}
                    label="Внесено (₽)"
                    onChange={formik.handleChange}
                    value={formik.values.deposit}
                    onBlur={formik.handleBlur}
                    error={!!formik.errors.deposit}
                    helperText={formik.errors.deposit}
                  />
                </Stack>
                <Stack direction="column">
                  <Typography className={`${styles.text} ${styles.text__main}`}>
                    <b>ИТОГО:</b> {formik.values.rate || 0}₽ ×{" "}
                    {formik.values.pets.length || 0} × {calcDays(formik.values)}{" "}
                    д. - {formik.values.discount || 0}%
                    {mode === "create" && (
                      <>
                        -{" "}
                        <span
                          className={`${styles.text__emphasized} ${styles.text__green}`}
                        >
                          {formik.values.deposit || 0}₽
                        </span>{" "}
                      </>
                    )}
                    = <b>{calcPrice(formik.values, mode === "create")}₽</b>
                  </Typography>
                  {mode === "edit" && (
                    <Typography
                      className={`${styles.text} ${styles.text__main}`}
                    >
                      <b>ОСТАЛОСЬ ВНЕСТИ:</b>{" "}
                      <b>{calcPrice(formik.values, true)}₽</b>
                    </Typography>
                  )}
                </Stack>

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
              </>
            )}
            {mode === "create" && (
              <div className={styles.toolbar}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={styles.toolbar__button}
                  >
                    Назад
                  </Button>
                  <Button
                    disabled={activeStep === steps.length - 1}
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={styles.toolbar__button}
                  >
                    Далее
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </FormEditor>
  );
};

export default OrderFormEditor;
