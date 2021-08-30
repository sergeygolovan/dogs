import {
  Avatar,
  Chip,
  MenuItem,
  TextField,
  Stack,
  SelectChangeEvent,
  Autocomplete,
  Checkbox,
  AvatarGroup,
} from "@material-ui/core";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import React, { ChangeEvent, FC, SyntheticEvent, useState } from "react";
import IPet from "../types/pet";
import styles from "../styles/PetSelector.module.css";
import PetCard from "./PetCard";

interface IPetSelectorProps {
  pets: IPet[];
  value: string[];
  name: string;
  label: string;
  helperText: string;
  onChange: (values: string[]) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
  error?: boolean;
}

const PetSelector: FC<IPetSelectorProps> = ({
  pets,
  value,
  name,
  label,
  helperText,
  onChange,
  onBlur,
  disabled = false,
  error = false,
}) => {
  const [selectedIds, setSelectedIds] = useState(value);

  const selectedPets = pets.filter((p) => selectedIds.includes(p._id));

  const items = pets.map((pet) => (
    <MenuItem key={pet._id} value={pet._id}>
      <b>{pet.name}</b>
    </MenuItem>
  ));

  const selectedItems = selectedPets.map((pet) => {
    const imagePath = pet.avatar
      ? `${process.env.NEXT_PUBLIC_SERVICE_URL}/${pet.avatar}`
      : "#";

    return <PetCard key={pet._id} pet={pet} showExtraInfo={false} />;
  });

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    value: IPet[]
  ) => {
    const selectedIds = value.map((p) => p._id);

    setSelectedIds(selectedIds);
    onChange(selectedIds);
  };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <div className={styles.container}>
      {!disabled && (
        <Autocomplete
          className={styles.input}
          multiple
          id="pet-selector"
          options={pets}
          value={selectedPets}
          fullWidth={true}
          disableCloseOnSelect
          onChange={handleChange}
          getOptionLabel={(pet) => pet.name}
          disabled={disabled}
          renderOption={(props, pet, { selected }) => (
            <li {...props}>
              <Checkbox
                name={name}
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {pet.name}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              error={error}
              label={label}
              name={name}
              onBlur={onBlur || (() => {})}
              helperText={!disabled && helperText}
            />
          )}
        />
      )}
      <Stack
        className={styles.cards}
        direction="row"
        justifyContent="flex-start"
      >
        {selectedItems}
      </Stack>
    </div>
  );
};

export default PetSelector;
