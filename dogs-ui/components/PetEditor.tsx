import { ChangeEvent, FC, SyntheticEvent, useEffect, useReducer } from "react";
import Avatar from "@material-ui/core/Avatar";
import Rating from "@material-ui/core/Rating";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styles from "../styles/PetEditor.module.css";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { AnyAction } from "redux";

export interface PetEditorProps {
  mode: "edit" | "create";
}

const PetEditor: FC<PetEditorProps> = ({ mode }) => {
  const { item, error, message } = useTypedSelector(
    (state) => state.selectedPet
  );

  const defaultValues = {
    name: "",
    image: "",
    rating: 0,
    breed: "",
    feed: item?.feed || "",
    character: "",
    diseases: "",
    comments: "",
  };

  const [fieldsState, dispatch] = useReducer(
    (prevState: any, action: AnyAction) => {
      switch (action.type) {
        case "reset":
          return {
            name: item?.name || "",
            image: item?.image || "",
            rating: item?.rating || null,
            breed: item?.breed || "",
            feed: item?.feed || "",
            character: item?.character || "",
            diseases: item?.diseases || "",
            comments: item?.comments || "",
          };
        case "attachImage":
          return { ...prevState, image: action.payload };
        case "update":
          return { ...prevState, [action.payload.name]: action.payload.value };
        default:
          return prevState;
      }
    },
    defaultValues
  );

  useEffect(() => {
      dispatch({ type: "reset" });
  }, [item]);

  const { createPet, updatePet } = useActions();

  const onSave = () => {
    if (fieldsState.name) {
      if (mode === 'edit') {
        updatePet(fieldsState);
      } else {
        createPet(fieldsState)
      }
    }
  };

  const onChange = (name: string) => (e: any, value: any) => {
    dispatch({
      type: "update",
      payload: {
        name,
        value: value || (e as ChangeEvent<HTMLInputElement>).target.value,
      },
    });
  };

  const getAvatarProps = () => {
    let avatarProps = {
      alt: item?.name || "",
      sx: { width: "200px", height: "200px" },
      src: "",
      children: "",
    };

    if (item?.image) {
      avatarProps.src = item.image;
    } else {
      if (item?.name) {
        avatarProps.children = item.name.slice(0, 2).toUpperCase();
      } else {
        avatarProps.children = "Загрузите изображение";
      }
    }

    return avatarProps;
  };

  return error ? (
    <div className={styles.error}>{message}</div>
  ) : (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <input
          accept="image/*"
          className={styles.hidden}
          id="avatar-button-file"
          type="file"
          onChange={() => {}}
        />
        <label htmlFor="avatar-button-file">
          <Avatar className={styles.avatar__image} {...getAvatarProps()} />
        </label>
        <div className={styles.avatar__rating}>
          <Rating value={fieldsState.rating} onChange={onChange("rating")} />
        </div>
      </div>

      <div className={styles.general}>
        <TextField
          className={`${styles.input} ${styles.input__main}`}
          fullWidth
          label="Кличка"
          onChange={onChange("name")}
          value={fieldsState.name}
        />

        <TextField
          className={styles.input}
          fullWidth
          label="Порода"
          onChange={onChange("breed")}
          value={fieldsState.breed}
        />
      </div>

      <div className={styles.detail}>
        <TextField
          className={styles.input}
          fullWidth
          label="Корм"
          onChange={onChange("feed")}
          value={fieldsState.feed}
        />

        <TextField
          className={styles.input}
          fullWidth
          label="Характер"
          onChange={onChange("character")}
          value={fieldsState.character}
        />

        <TextField
          className={styles.input}
          fullWidth
          label="Хронические заболевания"
          onChange={onChange("diseases")}
          value={fieldsState.diseases}
        />

        <TextField
          className={styles.input}
          fullWidth
          multiline
          rows={6}
          label="Комментарии"
          onChange={onChange("comments")}
          value={fieldsState.comments}
        />
      </div>

      <div className={styles.toolbar}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          disableElevation
          onClick={onSave}
        >
          {mode === "edit" ? "Сохранить" : "Создать"}
        </Button>
      </div>
    </div>
  );
};

export default PetEditor;
