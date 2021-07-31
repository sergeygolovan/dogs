import { ChangeEvent, FC, useState } from "react";
import PetCard from "./PetCard";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import { useTypedSelector } from "../hooks/useTypedSelector";
import styles from "../styles/PetCollection.module.css";
import { useRouter } from "next/router";

const PetCollection: FC = () => {
  const router = useRouter();
  const { items, error, message } = useTypedSelector((state) => state.petCollection);
  const [query, setQuery] = useState('')

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const itemsToDraw = items.filter(item => item.name?.includes(query));

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
