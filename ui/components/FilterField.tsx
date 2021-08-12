import {
  MenuItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "../styles/FilterField.module.css";
import { IFilter, IFilterFieldValue } from "../types/filter";

interface IFilterFieldProps<T> {
  filters: IFilter<T>[];
  items: T[];
  onChange: (items: T[], values: IFilterFieldValue) => void;
  selectedFilterId: string;
  query: string;
  order: string;
}

const FilterField = <T,>(props: IFilterFieldProps<T>) => {
  const [query, setQuery] = useState(props.query);
  const [filterId, setFilterId] = useState(props.selectedFilterId);
  const [order, setOrder] = useState(props.order);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterId(event.target.value);
  };

  const onSort = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (newAlignment !== null) {
      setOrder(newAlignment);
    }
  };

  useEffect(() => {

    let selectedFilter = props.filters.find(f => f.id === filterId);

    const sorter = (x: T, y: T) => {
      const x1 = selectedFilter?.fieldSelector(x),
        y1 = selectedFilter?.fieldSelector(y);

      console.log(x1, y1);

      let sortOrder = order === "desc" ? -1 : 1;

      return x1 > y1 ? sortOrder : x1 < y1 ? -sortOrder : 0;
    };

    const items = props.items
      .filter((e) => {
        let value = selectedFilter?.fieldSelector(e);

        if (value !== undefined && value !== null) {
            return value.toString().includes(query)
        }

        return false;
      })
      .sort(sorter);

    props.onChange(items, {
      selectedFilterId: filterId,
      query,
      order,
    });
  }, [filterId, query, order]);

  const filterItems = props.filters.map((filter) => (
    <MenuItem key={filter.id} value={filter.id}>
      <b>{filter.label}</b>
    </MenuItem>
  ));

  return (
    <div className={styles.container}>
      <TextField
        fullWidth
        className={styles.search}
        onChange={onSearch}
        value={query}
        label="Поиск"
        type="search"
      />
      <TextField
        fullWidth
        className={styles.selector}
        select
        label="Фильтр"
        value={filterId}
        onChange={onSelect}
      >
        {filterItems}
      </TextField>
      <ToggleButtonGroup size="large" fullWidth className={styles.sorter} value={order} exclusive onChange={onSort}>
        <ToggleButton value="asc">
          <ArrowUpwardIcon />
        </ToggleButton>
        <ToggleButton value="desc">
          <ArrowDownwardIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default FilterField;
