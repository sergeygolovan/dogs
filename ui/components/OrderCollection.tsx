import React, { ChangeEvent, FC, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import styles from "../styles/OrderCollection.module.css";
import { useRouter } from "next/router";
import {
  useAppSelector,
} from "../store";
import { Backdrop, CircularProgress, List } from "@material-ui/core";
import IOrder from "../types/order";
import OrderListItem from "./OrderListItem";

interface IOrderCollectionProps {
  orders: IOrder[];
}

const OrderCollection: FC<IOrderCollectionProps> = ({ orders }) => {
  const router = useRouter();

  const { loading, error, message } = useAppSelector((state) => state.orders);
  const [query, setQuery] = useState("");

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const itemsToDraw = orders
    //.filter((item) => item.?.toLowerCase().includes(query.toLowerCase()))
    .map((item) => <OrderListItem key={item._id} order={item} />);

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <TextField onChange={onSearch} label="Поиск" type="search" />
        <Button
          className={styles.button}
          startIcon={<AddCircleOutlineIcon style={{ fontSize: 30 }} />}
          size="large"
          onClick={() => router.push("/orders/create")}
        >
        Создать новый заказ
        </Button>
      </div>
      <div className={styles.items}>
          {itemsToDraw}
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default OrderCollection;