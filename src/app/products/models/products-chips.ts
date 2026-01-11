import { FilterChip } from "../../shared/components/filter-chips/filter-chip";

export const PRODUCTS_CHIPS: FilterChip[] = [
    {
        property: 'name',
        title: 'Nombre',
    },
    {
        property: 'description',
        title: 'Descripción',
    },
    {
        property: 'price',
        title: 'Precio',
        rangeDate: {
            startProperty: 'price.start',
            endProperty: 'price.end',
        },
    },
    {
        property: 'inStock',
        title: 'En stock',
    },
    {
        property: 'category',
        title: 'Categoría',
    },
];