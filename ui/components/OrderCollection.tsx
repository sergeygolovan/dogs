import React, { ChangeEvent, FC, useState } from "react";
import styles from "../styles/OrderCollection.module.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useRouter } from "next/router";
import {
  customerCollectionSelectors,
  useAppDispatch,
  useAppSelector,
} from "../store";
import { Backdrop, CircularProgress, List } from "@material-ui/core";
import IOrder, { OrderStatus } from "../types/order";
import OrderListItem from "./OrderListItem";
import { IFilter, IFilterFieldValue } from "../types/filter";
import { calcCreditAmount, calcPrice } from "../utils/calc";
import FilterField from "./FilterField";
import { setFilterValues } from "../store/features/orders/orderCollection.slice";
import { getOrderStatus } from "../utils/mapping";
import { useCallback } from "react";
import { useMemo } from "react";

interface IOrderCollectionProps {
  orders: IOrder[];
}

const OrderCollection: FC<IOrderCollectionProps> = ({ orders }) => {
  const router = useRouter();

  const { loading, filterValues } = useAppSelector((state) => state.orders);
  const [selectedOrders, setSelectedOrders] = useState(orders);
  const customers = useAppSelector(customerCollectionSelectors.selectAll);

  const dispatch = useAppDispatch();

  const filters: IFilter<IOrder>[] = useMemo(() => [
    {
      id: "dateTimeFrom",
      fieldSelector: (order) => order.dateTimeFrom,
      label: "Дата приезда",
    },
    {
      id: "dateTimeTo",
      fieldSelector: (order) => order.dateTimeTo,
      label: "Дата отъезда",
    },
    {
      id: "totalAmount",
      fieldSelector: (order) => calcPrice(order),
      label: "Общая сумма",
    },
    {
      id: "customer.name",
      fieldSelector: (order) => customers.find(c => c._id === order.customer)?.name,
      label: "ФИО клиента",
    },
    {
      id: "remainingAmount",
      fieldSelector: (order) => calcPrice(order, true),
      label: "Cумма к оплате",
    },
    {
      id: "createdAt",
      fieldSelector: (order) => order.createdAt,
      label: "Дата создания",
    },
    {
      id: "status",
      fieldSelector: (order) => {
        return getOrderStatus(order).text
      },
      label: "Статус",
    }
  ], [customers]);

  const onFilter = useCallback((items: IOrder[], filterValues: IFilterFieldValue) => {
    setSelectedOrders(items);
    dispatch(setFilterValues(filterValues));
  }, [dispatch, setSelectedOrders, setFilterValues]);

  const itemsToDraw = selectedOrders
    .map((item) => <OrderListItem key={item._id} order={item} />);

  return (
    <div className={styles.container}>
      <div className={styles.search}>
      <FilterField 
          filters={filters} 
          items={orders}
          onChange={onFilter} 
          filterFieldValue={filterValues}
        />
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