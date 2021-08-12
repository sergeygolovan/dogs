export interface IFilter<T> {
  id: string;
  label: string;
  fieldSelector: (entity: T) => any;
}

export interface IFilterFieldValue {
  selectedFilterId: string;
  query: string;
  order: string;
}
