export type TableColumn = {
  header: string;
  field: string;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'image' | 'currency';
};

export type TableData<T> = {
  [K in keyof T]: T[K];
};
