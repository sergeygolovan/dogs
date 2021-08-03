import React, { useState } from "react";
import ICustomer from "../types/customer";
import Select, { SelectChangeEvent } from "@material-ui/core/Select";
import {
  Avatar,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Stack,
} from "@material-ui/core";
import { customerCollectionSelectors, useAppSelector } from "../store";
import styles from "../styles/CustomerSelector.module.css";
import Link from "next/link";

function CustomerSelector({ value, name, label, helperText, onChange }) {
  const entities = useAppSelector(customerCollectionSelectors.selectAll);

  const [selectedId, setSelectedId] = useState(value || "");

  const selectedEntity = entities.find(c => c._id === selectedId);

  const imagePath = selectedEntity && selectedEntity.image
    ? `${process.env.NEXT_PUBLIC_SERVICE_URL}/${selectedEntity.image}`
    : "#";

  const items = [
    <MenuItem value="" key="none">
      <em>Не указан</em>
    </MenuItem>,
  ].concat(
    entities.map((customer) => (
      <MenuItem key={customer._id} value={customer._id}>
        <b>{customer.name}</b><em> ({customer.contacts})</em>
      </MenuItem>
    ))
  );

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedId(event.target.value);
    onChange(event, event.target.value);
  };

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Link href={selectedId ? `/customers/${selectedId}` : ''}>
        <Avatar
          className={styles.avatar}
          variant="rounded"
          src={imagePath}
          sx={{ width: "75px", height: "75px" }}
        />
        </Link>
        <FormControl className={styles.selector} sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            name={name}
            value={selectedId}
            label={label}
            onChange={handleChange}
          >
            {items}
          </Select>
          {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
        </FormControl>
      </Stack>
    </div>
  );
}

export default CustomerSelector;
