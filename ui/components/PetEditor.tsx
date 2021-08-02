import {
  ChangeEvent,
  FC,
  SyntheticEvent,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import Avatar from "@material-ui/core/Avatar";
import Rating from "@material-ui/core/Rating";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styles from "../styles/PetEditor.module.css";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { AnyAction } from "redux";
import router, { useRouter } from "next/router";
import ErrorDialog from "./ErrorDialog";

export interface PetEditorProps {
  mode: "edit" | "create";
}

export const PetEditor: FC<PetEditorProps> = ({ mode }) => {
  const { item, error, message, redirectTo } = useTypedSelector(
    (state) => state.selectedPet
  );

  const router = useRouter();

  if (redirectTo) {
    router.push(redirectTo);
  }

  const avatarRef = useRef<HTMLInputElement>();

  const defaultValues = {
    name: "",
    image: "",
    rating: 0,
    breed: "",
    feed: "",
    character: "",
    diseases: "",
    comments: "",
    customer: ""
  };

  const [fieldsState, dispatch] = useReducer(
    (prevState: any, action: AnyAction) => {
      switch (action.type) {
        case "reset":
          return {
            _id: item?._id || null,
            name: item?.name || "",
            image: item?.image || "",
            rating: item?.rating || 0,
            breed: item?.breed || "",
            feed: item?.feed || "",
            character: item?.character || "",
            diseases: item?.diseases || "",
            comments: item?.comments || "",
            customer: item?.customer || ""
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

  const { createPet, updatePet, deletePet } = useActions();

  const onSave = () => {
    if (fieldsState.name) {
      if (mode === "edit") {
        updatePet(fieldsState);
      } else {
        createPet(fieldsState);
      }
    }
  };

  const onDelete = () => {
    if (item) {
      deletePet(item._id);
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

  const onChangeAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    let image = e.target.files?.[0];

    if (image) {
      dispatch({ type: "attachImage", payload: image });
    }
  };

  const getAvatarProps = () => {
    let avatarProps = {
      alt: item?.name || "",
      sx: { width: "200px", height: "200px" },
      src: "",
      children: "",
    };

    if (item?.image) {
      avatarProps.src = `http://192.168.1.57:5000/${item.image}`;
    } else {
      if (item?.name) {
        avatarProps.children = item.name.slice(0, 2).toUpperCase();
      } else {
        avatarProps.children = "Загрузите изображение";
      }
    }

    return avatarProps;
  };

  return (
    <div className={styles.container}>
      {error ? <ErrorDialog message={message} /> : null}
      <div className={styles.avatar}>
        <input
          accept="image/*"
          className={styles.hidden}
          id="avatar-button-file"
          type="file"
          onChange={onChangeAvatar}
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
          label="Хозяева"
          onChange={onChange("owners")}
          value={fieldsState.owners}
        />

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
        {mode === "edit" ? (
          <Button
            className={styles.toolbar__button}
            variant="contained"
            size="large"
            color="error"
            disableElevation
            onClick={onDelete}
          >
            Удалить
          </Button>
        ) : null}

        <Button
          className={styles.toolbar__button}
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
