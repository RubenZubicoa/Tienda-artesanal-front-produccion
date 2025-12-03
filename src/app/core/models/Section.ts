export type Section = {
  title: string;
  icon: string;
  route: string;
  badge?: number;
};

export const SIDENAV_SECTIONS: Section[] = [
    {
        title: 'Vendedores',
        icon: 'store',
        route: '/manufacturers',
    },
    {
      title: 'Productos',
      icon: 'category',
      route: '/products',
    },
];

export const HEADER_SECTIONS: Section[] = [
  {
    title: 'Perfil',
    icon: 'person',
    route: '/profile',
  },
  {
    title: 'Carrito',
    icon: 'shopping_cart',
    route: '/carrito',
  },
]

export const MANUFACTURERS_SECTIONS: Section[] = [
  {
    title: 'Pedidos',
    icon: 'list',
    route: '/orders',
  },
  {
    title: 'Mis productos',
    icon: 'inventory',
    route: '/my-products',
  },
  {
    title: 'Análisis',
    icon: 'analytics',
    route: '/analysis',
  }
]