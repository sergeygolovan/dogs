import { Typography } from "@material-ui/core";
import React, { FC } from "react";
import IOrder from "../types/order";
import styles from "../styles/OrderListItem.module.css";
import Link from "next/link";
import { customerCollectionSelectors, petCollectionSelectors, useAppSelector } from "../store";
import { useStore } from "react-redux";

interface OrderListItemProps {
  order: IOrder;
}

const OrderListItem: FC<OrderListItemProps> = ({ order }) => {
  const store = useStore();
  const customer = useAppSelector(
    customerCollectionSelectors.selectById.bind(
      null,
      store.getState(),
      order.customer
    )
  );
  const pets = useAppSelector(petCollectionSelectors.selectAll).filter((p) => order.pets.includes(p._id));

  console.log(pets, order.pets);

  return (
    <Link href={`orders/${order._id}`}>
      <div className={styles.container}>
        <div className={styles.primary}>
          <Typography
            className={styles.text__main}
            variant="h5"
            color="text.primary"
          >
            ID: {order._id}
          </Typography>
          <Typography
            className={styles.text}
            variant="body2"
            color="text.primary"
          >
            <b>Клиент: </b> {customer?.name}
          </Typography>
          <Typography
            className={styles.text}
            variant="body2"
            color="text.primary"
          >
            <b>Питомцы: </b> {pets.map((p) => p.name).join(", ")}
          </Typography>
          <Typography
            className={styles.text}
            variant="body2"
            color="text.secondary"
          >
            <b>Дата приезда:</b> {new Date(order.dateTimeFrom).toLocaleString()}
          </Typography>
          <Typography
            className={styles.text}
            variant="body2"
            color="text.secondary"
          >
            <b>Дата отъезда:</b> {new Date(order.dateTimeTo).toLocaleString()}
          </Typography>
        </div>
        <div className={styles.secondary}>
          <Typography
            className={styles.text}
            variant="body2"
            color="text.primary"
          >
            <b>Дата создания заказа:</b>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </Typography>

          <Typography
            className={styles.text}
            variant="body2"
            color="text.primary"
          >
            <b>Скидка:</b> {order.discount ? `${order.discount}%` : "нет"}
          </Typography>
        </div>
        <div className={styles.extra}>
          {order.comments && (
            <Typography variant="body2" color="text.secondary">
              <b>Комментарии:</b> {order.comments}
            </Typography>
          )}
        </div>
      </div>
    </Link>
  );
};

export default OrderListItem;
