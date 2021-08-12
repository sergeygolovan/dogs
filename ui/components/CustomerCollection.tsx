import React, { ChangeEvent, FC, useEffect, useState } from "react";
import PetCard from "./PetCard";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import styles from "../styles/CustomerCollection.module.css";
import { useRouter } from "next/router";
import {
  useAppSelector,
} from "../store";
import { fetchPetCollection } from "../store/actions/pet.actions";
import { Alert, Backdrop, CircularProgress, List, Snackbar } from "@material-ui/core";
import ICustomer from "../types/customer";
import CustomerListItem from "./CustomerListItem";

interface ICustomerCollectionProps {
  customers: ICustomer[];
}

const CustomerCollection: FC<ICustomerCollectionProps> = ({ customers }) => {
  const router = useRouter();

  const { loading, error, message } = useAppSelector((state) => state.customers);
  const [query, setQuery] = useState("");

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const [isToastOpen, setIsToastOpen] = useState(error);
  const onToastClose = () => setIsToastOpen(false);

  const itemsToDraw = customers
    .filter((item) => item.name?.toLowerCase().includes(query.toLowerCase()))
    .map((item) => <CustomerListItem key={item._id} customer={item} />);

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <TextField onChange={onSearch} label="Поиск" type="search" />
        <Button
          className={styles.button}
          startIcon={<AddCircleOutlineIcon style={{ fontSize: 30 }} />}
          size="large"
          onClick={() => router.push("/customers/create")}
        >
          Добавить карточку клиента
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

export default CustomerCollection;
