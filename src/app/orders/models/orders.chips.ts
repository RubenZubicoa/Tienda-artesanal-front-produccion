import { FilterChip } from "../../shared/components/filter-chips/filter-chip";

export const ORDERS_CHIPS: FilterChip[] = [
  {
    title: 'Nombre',
    property: 'username',
  },
  {
    title: 'Teléfono',
    property: 'phone',
  },
  {
    title: 'Email',
    property: 'email',
  },
  {
    title: 'Estado',
    property: 'status',
  },
  {
    title: 'Fecha de creación',
    property: 'createdAt.start',
    rangeDate: {
      startProperty: 'createdAt.start',
      endProperty: 'createdAt.end',
    },
  },
];