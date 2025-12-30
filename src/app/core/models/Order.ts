import { Product } from './Product';
import { Manufacturer } from './Manufacturer';

export type OrderStatus = 'pending' | 'completed' | 'cancelled' | 'shipped' | 'delivered' | 'returned';

export type Order = {
  uuid?: string;
  username: string;
  address: string;
  phone: string;
  email: string;
  products: {
      productId: Product['uuid'];
      name: string;
      quantity: number;
      price: number;
  }[];
  manufacturerId: Manufacturer['uuid'];
  createdAt: number;
  updatedAt?: number;
  status: OrderStatus;
};

export type OrderDB = {
  _id?: string;
  username: string;
  address: string;
  phone: string;
  email: string;
  products: {
      productId: Product['uuid'];
      name: string;
      quantity: number;
      price: number;
  }[];
  manufacturerId: Manufacturer['uuid'];
  status: OrderStatus;
  createdAt: number;
  updatedAt?: number;
}

export type AddOrder = Omit<Order, 'uuid' | 'createdAt' | 'updatedAt' | 'status'>;
export type UpdateOrder = Omit<Order, 'uuid' | 'createdAt' | 'updatedAt'>;


export function mapOrderToOrder(orderDB: OrderDB): Order {
  return {
    uuid: orderDB._id ?? '',
    username: orderDB.username,
    address: orderDB.address,
    phone: orderDB.phone,
    email: orderDB.email,
    products: orderDB.products,
    manufacturerId: orderDB.manufacturerId,
    status: orderDB.status as OrderStatus,
    createdAt: orderDB.createdAt,
    updatedAt: orderDB.updatedAt,
  };
}

export function getStatusLabel(status: OrderStatus): string {
  const statusLabels: Record<string, string> = {
    'pending': 'Pendiente',
    'completed': 'Completado',
    'cancelled': 'Cancelado',
    'shipped': 'Enviado',
  };
  return statusLabels[status] || status;
}