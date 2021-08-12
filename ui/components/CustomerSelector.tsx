import React, { FC, useState } from "react";
import ICustomer from "../types/customer";
import Select, { SelectChangeEvent } from "@material-ui/core/Select";
import {
  Avatar,
  FormControl,
  FormHelperText,
  InputLabel,
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

const CustomerSelector: FC<ICustomerSelectorProps> = ({ value, name, label, helperText, onChange, onBlur, disabled = false, error = false }) => {
  const customers = useAppSelector(customerCollectionSelectors.selectAll);

  const [selectedId, setSelectedId] = useState(value || "");

  const selectedCustomer = customers.find(c => c._id === selectedId);

  const imagePath = selectedCustomer && selectedCustomer.avatar
    ? `${process.env.NEXT_PUBLIC_SERVICE_URL}/${selectedCustomer.avatar}`
    : "#";

  const items = [
    <MenuItem value="" key="none">
      <em>Не указан</em>
    </MenuItem>,
  ].concat(
    customers.map((customer) => (
      <MenuItem key={customer._id} value={customer._id}>
        <b>{customer.name}</b><em> ({customer.contacts})</em>
      </MenuItem>
    ))
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedId(event.target.value);
    onChange(event);
  };

  return (
    <div className={styles.container}>
      <Stack direction="row" spacing={2}>
        <Link href={selectedId ? `/customers/${selectedId}` : ''}>
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
          value={selectedId}
          onChange={handleChange}
          onBlur={onBlur || (() => {})}
          helperText={!disabled && helperText}
          disabled={disabled}
        >
          {items}
        </TextField>
      </Stack>
    </div>
  );
}

export default CustomerSelector;
