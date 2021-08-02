import { ChangeEvent, FC, useEffect, useState } from "react";
import PetCard from "./PetCard";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import { useTypedSelector } from "../hooks/useTypedSelector";
import styles from "../styles/PetCollection.module.css";
import { useRouter } from "next/router";
import { petCollectionSelectors, useAppDispatch, useAppSelector } from "../store";
import { useStore } from "react-redux";
import { fetchPetCollection } from "../store/actions/pets.actions";
import IPet from "../types/pet";

const PetCollection: FC = () => {
  const router = useRouter();

  const entities: IPet[] = useAppSelector(petCollectionSelectors.selectAll);
  const [query, setQuery] = useState('')

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPetCollection())
  }, [])

  const error = false;
  const message = ''

  const itemsToDraw = entities.filter(item => item.name?.includes(query));
  //const itemsToDraw = items.filter(item => item.name?.includes(query));

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <TextField onChange={onSearch} id="standard-search" label="Поиск" type="search" />
        <Button startIcon={<AddIcon/>} size="large" onClick={() => router.push('/pets/create')}>Создать карточку питомца</Button>
      </div>
      <div className={styles.items}>
        {error ? <div>Ошибка при загрузке списка питомцев: {message}</div> : itemsToDraw.map((item) => (
          <PetCard key={item._id} {...item} />
          
        ))}
      </div>
    </div>
  );
};

export default PetCollection;
