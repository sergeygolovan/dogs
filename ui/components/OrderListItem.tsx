import { Avatar, AvatarGroup, Typography } from "@material-ui/core";
import React, { FC } from "react";
import IOrder from "../types/order";
import styles from "../styles/OrderListItem.module.css";
import Link from "next/link";
import {
  customerCollectionSelectors,
  petCollectionSelectors,
  useAppSelector,
} from "../store";
import { useStore } from "react-redux";
import { calcCreditAmount, calcPrice } from "../utils/calc";
import { getOrderStatus } from "../utils/mapping";

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
  
  const pets = useAppSelector(petCollectionSelectors.selectAll).filter((p) =>
    order.pets.includes(p._id)
  );

  const totalAmount = calcPrice(order);
  const amountToPay = calcPrice(order, true);
  const creditAmount = calcCreditAmount([order]);
  const status = getOrderStatus(order);

  return (
    <Link href={`/orders/${order._id}`} passHref>
      <div className={styles.container}>
        <div className={styles.avatar__primary}>
          <Avatar
            className={styles.avatar__image}
            sx={{ width: "150px", height: "150px" }}
            alt={customer!.name}
            src={
              customer!.avatar
                ? `${process.env.NEXT_PUBLIC_SERVICE_URL}/${customer.avatar}`
                : "#"
            }
          />
        </div>

        <div className={styles.avatar__secondary}>
          <AvatarGroup max={3} className={styles.avatar__group}>
            {pets.map((pet) => (
              <Avatar
                key={pet._id}
                className={styles.avatar__image}
                sx={{ width: "50px", height: "50px" }}
                alt={pet.name}
                src={
                  pet.avatar
                    ? `${process.env.NEXT_PUBLIC_SERVICE_URL}/${pet.avatar}`
                    : "#"
                }
              />
            ))}
          </AvatarGroup>
        </div>

        <div className={styles.info__primary}>
          <Typography
            className={styles.text__main}
            variant="h5"
            color="text.primary"
          >
            <b>Клиент: </b> {customer?.name}
          </Typography>
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
            color="text.secondary"
          >
            ID: {order._id}
          </Typography>

          <Typography
            className={`${styles.status} ${styles[`status__${status.level}`]}`}
            variant="body2"
          >
            Статус: {status.text}
          </Typography>
        </div>

        <div className={styles.info__secondary}>
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
            color="text.primary"
          >
            <b>Дата приезда:</b> {new Date(order.dateTimeFrom).toLocaleString()}
          </Typography>
          <Typography
            className={styles.text}
            variant="body2"
            color="text.primary"
          >
            <b>Дата отъезда:</b> {new Date(order.dateTimeTo).toLocaleString()}
          </Typography>
        </div>

        <div className={styles.info__extra}>
          <Typography
            className={styles.text}
            variant="body2"
            color="text.primary"
          >
            <b>Общая сумма:</b> {totalAmount} ₽
          </Typography>
          <Typography
            className={styles.text}
            variant="body2"
            color="text.primary"
          >
            <b>Внесено:</b> {order.deposit || 0} ₽
          </Typography>
          <Typography
            className={styles.text}
            variant="body2"
            color="text.primary"
          >
            <b>Скидка:</b> {order.discount !== 0 ? `${order.discount}%` : "нет"}
          </Typography>
          {creditAmount === 0 ? (
            <Typography
              className={styles.text}
              variant="body2"
              color="text.primary"
            >
              <b>К оплате:</b> {amountToPay} ₽
            </Typography>
          ) : (
            <Typography
              className={`${styles.text} ${styles.text__warning}`}
              variant="body2"
              color="text.primary"
            >
              <b>Задолженность:</b> {creditAmount} ₽
            </Typography>
          )}
        </div>

        <div className={styles.description}>
          {order.comments && (
            <Typography variant="body2" color="text.secondary">
              <b>Комментарии:</b> {order.comments}
            </Typography>
          )}
        </div>

        {/* <div className={styles.primary}>
          
          
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
        </div> */}
      </div>
    </Link>
  );
};

export default OrderListItem;
