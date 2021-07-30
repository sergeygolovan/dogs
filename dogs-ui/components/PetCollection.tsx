import { FC } from "react";
import PetCard from "./PetCard";
import TextField from "@material-ui/core/TextField";
import { useTypedSelector } from "../hooks/useTypedSelector";
import styles from "../styles/PetCollection.module.css";
import { useRouter } from "next/router";

const PetCollection: FC = () => {
  const router = useRouter();
  const { items, error, message } = useTypedSelector((state) => state.petCollection);

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <TextField id="standard-search" label="Поиск" type="search" />
      </div>
      <div className={styles.items}>
        {error ? <div>Ошибка при загрузке списка питомцев: {message}</div> : items.map((item) => (
          <PetCard key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default PetCollection;
