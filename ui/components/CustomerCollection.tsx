import React, { FC, useCallback, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import styles from "../styles/CustomerCollection.module.css";
import { useRouter } from "next/router";
import {
  orderCollectionSelectors,
  useAppDispatch,
  useAppSelector,
} from "../store";
import { Backdrop, CircularProgress } from "@material-ui/core";
import ICustomer from "../types/customer";
import CustomerListItem from "./CustomerListItem";
import { IFilter, IFilterFieldValue } from "../types/filter";
import { setFilterValues } from "../store/features/customers/customerCollection.slice";
import FilterField from "./FilterField";
import { calcCreditAmount } from "../utils/calc";
import { useMemo } from "react";

interface ICustomerCollectionProps {
  customers: ICustomer[];
}

const CustomerCollection: FC<ICustomerCollectionProps> = ({ customers }) => {
  const router = useRouter();

  const { loading, filterValues } = useAppSelector((state) => state.customers);
  const [selectedCustomers, setSelectedCustomers] = useState(customers);
  const orders = useAppSelector(orderCollectionSelectors.selectAll);

  const dispatch = useAppDispatch();

  const filters: IFilter<ICustomer>[] = useMemo(() => [
    {
      id: "name",
      fieldSelector: (customer) => customer.name,
      label: "ФИО",
    },
    {
      id: "rating",
      fieldSelector: (customer) => customer.rating,
      label: "Рейтинг",
    },
    {
      id: "orders.length",
      fieldSelector: (customer) => customer.orders.length,
      label: "Количество посещений",
    },
    {
      id: "customer.address",
      fieldSelector: (customer) => customer.address,
      label: "Адрес",
    },
    {
      id: "customer.registrationDate",
      fieldSelector: (customer) => customer.registrationDate,
      label: "Дата регистрации",
    },
    {
      id: "orders.credit",
      fieldSelector: (customer) => {
        let selectedOrders = orders.filter((o) => customer.orders.includes(o._id));
  
        return calcCreditAmount(selectedOrders);
      },
      label: "Задолженность",
    },
  ], [orders]);

  const onFilter = useCallback((items: ICustomer[], filterValues: IFilterFieldValue) => {
    setSelectedCustomers(items);
    dispatch(setFilterValues(filterValues));
  }, [dispatch, setSelectedCustomers, setFilterValues]);

  const itemsToDraw = selectedCustomers.map((item) => (
    <CustomerListItem key={item._id} customer={item} />
  ));

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <FilterField
          filters={filters}
          items={customers}
          onChange={onFilter}
          filterFieldValue={filterValues}
        />
        <Button
          className={styles.button}
          startIcon={<AddCircleOutlineIcon style={{ fontSize: 30 }} />}
          size="large"
          onClick={() => router.push("/customers/create")}
        >
          Добавить карточку клиента
        </Button>
      </div>
      <div className={styles.items}>{itemsToDraw}</div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default CustomerCollection;
