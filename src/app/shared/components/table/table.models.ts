export type TableColumn = {
  header: string;
  field: string;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'image';
};

export type TableData<T> = {
  [K in keyof T]: T[K];
};

export type TableDataWithStatus<T> = TableData<T> & {
  status?: 'completed' | 'pending' | 'cancelled';
};