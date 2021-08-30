import { Avatar } from "@material-ui/core";
import React, { ChangeEvent, FC, useState } from "react";
import styles from "../styles/AvatarUploader.module.css";

interface IAvatarUploaderProps {
  name: string;
  value: string;
  size: string;
  onChange: (e: React.ChangeEvent<any>, file: File) => void;
};

const AvatarUploader: FC<IAvatarUploaderProps> = (props) => {
  const [imagePath, setImagePath] = useState(props.value);

  let src;
  try {
    if (imagePath) {
      src = new URL(imagePath).toString();
    } else {
      src = '';
    }
  } catch (e) {
    src = new URL(`${process.env.NEXT_PUBLIC_SERVICE_URL}/${imagePath}`).toString();
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
    if (file) {
      setImagePath(URL.createObjectURL(file));
      props.onChange(e, file);
    }
  };

  return (
    <>
      <input
        accept="image/*"
        className={styles.hidden}
        id={props.name}
        type="file"
        name={props.name}
        onChange={onChange}
      />
      <label htmlFor={props.name}>
        <Avatar
          variant="rounded"
          className={styles.avatar__image}
          src={src}
          sx={{ width: props.size, height: props.size }}
        >{!imagePath && "Загрузить фото"}</Avatar>
      </label>
    </>
  );
}

export default AvatarUploader;
