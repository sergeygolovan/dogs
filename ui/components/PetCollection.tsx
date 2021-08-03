import React, { ChangeEvent, FC, useEffect, useState } from "react";
import PetCard from "./PetCard";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import styles from "../styles/PetCollection.module.css";
import { useRouter } from "next/router";
import {
  petCollectionSelectors,
  useAppDispatch,
  useAppSelector,
} from "../store";
import { fetchPetCollection } from "../store/actions/pet.actions";
import Loader from "./Loader";

const PetCollection: FC = () => {
  const router = useRouter();

  const { loading, error, message } = useAppSelector((state) => state.pets);

  const entities = useAppSelector(petCollectionSelectors.selectAll);
  const [query, setQuery] = useState("");

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPetCollection());
  }, []);

  const itemsToDraw = entities
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
              startIcon={<AddIcon />}
              size="large"
              onClick={() => router.push("/pets/create")}
            >
              Создать карточку питомца
            </Button>
          </div>
          <div className={styles.items}>
            {error ? (
              <div>Ошибка при загрузке списка питомцев: {message}</div>
            ) : (
              itemsToDraw
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PetCollection;
