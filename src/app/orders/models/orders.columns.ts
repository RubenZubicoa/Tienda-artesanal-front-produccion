import { TableColumn } from "../../shared/components/table/table.models";

export const ORDERS_COLUMNS: TableColumn[] = [
  {
    header: 'ID',
    field: 'uuid',
  },
  {
    header: 'Nombre',
    field: 'name',
  },
  {
    header: 'Email',
    field: 'email',
  },
  {
    header: 'Teléfono',
    field: 'phone',
  },
  {
    header: 'Dirección',
    field: 'address',
  },    
  {
    header: 'Ciudad',
    field: 'city',
  },
  {
    header: 'Código postal',
    field: 'zip',
  },
  {
    header: 'Total',
    field: 'total',
  },
  {
    header: 'Fecha de creación',
    field: 'createdAt',
    type: 'date',
  },
  {
    header: 'Fecha de actualización',
    field: 'updatedAt',
    type: 'date',
  },
  {
    header: 'Estado',
    field: 'status',
  },
];