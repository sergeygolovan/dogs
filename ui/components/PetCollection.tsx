import React, { ChangeEvent, FC, useEffect, useState } from "react";
import PetCard from "./PetCard";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import styles from "../styles/PetCollection.module.css";
import { useRouter } from "next/router";
import {
  petCollectionSelectors,
  useAppDispatch,
  useAppSelector,
} from "../store";
import { fetchPetCollection } from "../store/actions/pet.actions";
import Loader from "./Loader";
import IPet from "../types/pet";
import { Alert, Snackbar } from "@material-ui/core";

interface IPetCollectionProps {
  pets: IPet[];
}

const PetCollection: FC<IPetCollectionProps> = ({ pets }) => {
  const router = useRouter();

  const { loading, error, message } = useAppSelector((state) => state.pets);
  const [query, setQuery] = useState("");

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const [isToastOpen, setIsToastOpen] = useState(error);
  const onToastClose = () => setIsToastOpen(false);

  const itemsToDraw = pets
    .filter((item) => item.name?.toLowerCase().includes(query.toLowerCase()))
    .map((item) => <PetCard key={item._id} {...item} />);

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <>
          <div className={styles.search}>
            <TextField onChange={onSearch} label="Поиск" type="search" />
            <Button
              className={styles.button}
              startIcon={<AddCircleOutlineIcon style={{ fontSize: 30 }} />}
              size="large"
              onClick={() => router.push("/pets/create")}
            >
              Добавить карточку питомца
            </Button>
          </div>
          <div className={styles.items}>{itemsToDraw}</div>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={isToastOpen}
            autoHideDuration={3000}
            onClose={onToastClose}
          >
            <Alert
              severity={error ? "error" : "success"}
              onClose={onToastClose}
            >
              {message}
            </Alert>
          </Snackbar>
        </>
      )}
    </div>
  );
};

export default PetCollection;
