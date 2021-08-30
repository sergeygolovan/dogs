import React, { FC } from "react";
import {
  Avatar,
  MenuItem,
  Stack,
  TextField,
} from "@material-ui/core";
import { customerCollectionSelectors, useAppSelector } from "../store";
import styles from "../styles/CustomerSelector.module.css";
import Link from "next/link";

interface ICustomerSelectorProps {
  value: string;
  name: string;
  label: string;
  helperText: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
  error?: boolean;
}

const CustomerSelector: FC<ICustomerSelectorProps> = (props) => {
  const {
    value,
    name,
    label,
    helperText,
    onChange,
    onBlur,
    disabled = false,
    error = false,
  } = props;

  const customers = useAppSelector(customerCollectionSelectors.selectAll);

  const selectedCustomer = customers.find((c) => c._id === value);

  const imagePath =
    selectedCustomer && selectedCustomer.avatar
      ? `${process.env.NEXT_PUBLIC_SERVICE_URL}/${selectedCustomer.avatar}`
      : "#";

  const items = [
    <MenuItem value="" key="none">
      <em>Не указан</em>
    </MenuItem>,
  ].concat(
    customers.map((customer) => (
      <MenuItem key={customer._id} value={customer._id}>
        <b>{customer.name}</b>
        <em> ({customer.contacts})</em>
      </MenuItem>
    ))
  );

  return (
    <div className={styles.container}>
      <Stack direction="row" spacing={2}>
        <Link href={value ? `/customers/${value}` : ""} passHref>
          <Avatar
            className={styles.avatar}
            variant="rounded"
            src={imagePath}
            sx={{ width: "56px", height: "56px" }}
          />
        </Link>
        <TextField
          className={styles.selector}
          select
          error={error}
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur || (() => {})}
          helperText={!disabled && helperText}
          disabled={disabled}
        >
          {items}
        </TextField>
      </Stack>
    </div>
  );
};

export default CustomerSelector;
