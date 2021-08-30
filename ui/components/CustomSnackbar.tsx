import { Alert, Snackbar } from "@material-ui/core";
import React, { FC, useState } from "react";
import { useAppDispatch } from "../store";
import { removeMessage } from "../store/features/messages/messages.slice";
import IMessage from "../types/message";

type CustomSnackbarProps = IMessage & { position: number };

const CustomSnackbar: FC<CustomSnackbarProps> = ({ id, message, type, position }) => {
  const [open, setOpen] = useState(true);

  const dispatch = useAppDispatch();

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    setOpen(false);
    dispatch(removeMessage(id));
  };

  let top = position * 60;

  return (
    <Snackbar
      style={{
        top: `${top}px`,
      }}
      open={open}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;
