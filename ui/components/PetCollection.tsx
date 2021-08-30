import React, { FC, useCallback, useMemo, useState } from "react";
import PetCard from "./PetCard";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useRouter } from "next/router";
import { customerCollectionSelectors, useAppDispatch, useAppSelector } from "../store";
import IPet from "../types/pet";
import { Backdrop, CircularProgress } from "@material-ui/core";
import FilterField from "./FilterField";
import { IFilter, IFilterFieldValue } from "../types/filter";
import { setFilterValues } from "../store/features/pets/petCollection.slice";
import styles from "../styles/PetCollection.module.css";

interface IPetCollectionProps {
  pets: IPet[];
}

const PetCollection: FC<IPetCollectionProps> = ({ pets }) => {
  const router = useRouter();

  const { loading, filterValues } = useAppSelector((state) => state.pets);
  const [selectedPets, setSelectedPets] = useState(pets);
  const customers = useAppSelector(customerCollectionSelectors.selectAll);

  const dispatch = useAppDispatch();

  const filters: IFilter<IPet>[] = useMemo(() =>[
    {
      id: "name",
      fieldSelector: (pet) => pet.name,
      label: "Кличка",
    },
    {
      id: "rating",
      fieldSelector: (pet) => pet.rating,
      label: "Рейтинг",
    },
    {
      id: "orders.length",
      fieldSelector: (pet) => pet.orders.length,
      label: "Количество посещений",
    },
    {
      id: "customer.name",
      fieldSelector: (pet) => customers.find(c => c._id === pet.customer)?.name,
      label: "Владелец",
    },
  ], [customers]);

  const onFilter = useCallback((items: IPet[], filterValues: IFilterFieldValue) => {
    setSelectedPets(items);
    dispatch(setFilterValues(filterValues))
  }, [dispatch, setSelectedPets, setFilterValues]);

  const itemsToDraw = selectedPets.map((item) => (
    <PetCard key={item._id} pet={item} />
  ));

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <FilterField 
          filters={filters} 
          items={pets}
          onChange={onFilter} 
          filterFieldValue={filterValues}
        />
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default PetCollection;
