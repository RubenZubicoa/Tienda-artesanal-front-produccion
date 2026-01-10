import { TableColumn } from "../../shared/components/table/table.models";

export const ORDERS_COLUMNS: TableColumn[] = [
  {
    header: 'Nombre',
    field: 'username',
  },   
  {
    header: 'Teléfono',
    field: 'phone',
  },
  {
    header: 'Email',
    field: 'email',
  },
  {
    header: 'Total',
    field: 'total',
    type: 'currency',
  },
  {
    header: 'Fecha de creación',
    field: 'createdAt',
    type: 'date',
  },
  {
    header: 'Estado',
    field: 'status',
  },
];