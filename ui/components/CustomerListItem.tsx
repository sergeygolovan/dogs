import { Avatar, Rating, Typography } from "@material-ui/core";
import React, { FC } from "react";
import ICustomer from "../types/customer";
import styles from "../styles/CustomerListItem.module.css";
import Link from "next/link";
import { useAppSelector, orderCollectionSelectors } from "../store";
import { calcCreditAmount } from "../utils/calc";

interface CustomerListItemProps {
  customer: ICustomer;
}

const CustomerListItem: FC<CustomerListItemProps> = ({ customer }) => {
  const orders = useAppSelector(orderCollectionSelectors.selectAll).filter(
    (p) => (customer.orders || []).includes(p._id)
  );

  const creditAmount = calcCreditAmount(orders);

  return (
    <Link href={`/customers/${customer._id}`} passHref>
      <div className={styles.container}>
        <div className={styles.avatar}>
          <Avatar
            className={styles.avatar__image}
            variant="rounded"
            sx={{ width: "150px", height: "150px" }}
            alt={customer.name}
            src={
              customer.avatar
                ? `${process.env.NEXT_PUBLIC_SERVICE_URL}/${customer.avatar}`
                : "#"
            }
          />
          <div className={styles.avatar__rating}>
            <Rating precision={0.5} value={customer.rating} readOnly />
          </div>
        </div>
        <div className={styles.primary}>
          <Typography
            className={styles.text__main}
            variant="h5"
            color="text.primary"
          >
            {customer.name}
          </Typography>
          {creditAmount > 0 && (
            <Typography
              className={`${styles.text__main} ${styles.text__warning}`}
              variant="body2"
            >
              <b>Задолженность:</b> {creditAmount} ₽
            </Typography>
          )}
          <Typography
            className={styles.text}
            variant="body2"
            color="text.primary"
          >
            <b>Контактные данные:</b> {customer.contacts}
          </Typography>
          <Typography
            className={styles.text}
            variant="body2"
            color="text.primary"
          >
            <b>Адрес:</b> {customer.address || "не указан"}
          </Typography>
        </div>
        <div className={styles.secondary}>
          <Typography
            className={styles.text}
            variant="body2"
            color="text.primary"
          >
            <b>Дата регистрации:</b> {customer.registrationDate}
          </Typography>

          <Typography
            className={styles.text}
            variant="body2"
            color="text.primary"
          >
            <b>Скидка:</b> {customer.discount ? `${customer.discount}%` : "нет"}
          </Typography>
        </div>
        <div className={styles.extra}>
          {customer.comments && (
            <Typography variant="body2" color="text.secondary">
              <b>Комментарии:</b> {customer.comments}
            </Typography>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CustomerListItem;
