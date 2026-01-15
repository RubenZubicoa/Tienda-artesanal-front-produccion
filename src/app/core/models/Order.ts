import { Product } from './Product';
import { Manufacturer } from './Manufacturer';
import { MeetingPoint } from './MeetingPoint';

export enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  RETURNED = 'returned',
}

export type OrderFilters = {
  username?: string | null;
  phone?: string | null;
  email?: string | null;
  status?: OrderStatus | null;
  createdAt?: {
      start?: number | null;
      end?: number | null;
  } | null;
  manufacturerId?: Manufacturer['uuid'] | null;
}

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
  meetingPointId?: MeetingPoint['uuid'];
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
  meetingPointId?: MeetingPoint['uuid'];
  status: OrderStatus;
  createdAt: number;
  updatedAt?: number;
}

export type AddOrder = Omit<Order, 'uuid' | 'createdAt' | 'updatedAt' | 'status' | 'address'>;
export type UpdateOrder = Omit<Order, 'uuid' | 'createdAt' | 'updatedAt'>;

export type OrderTableData = Order & {total: number}

export function mapOrderToOrder(orderDB: OrderDB): Order {
  return {
    uuid: orderDB._id ?? '',
    username: orderDB.username,
    address: orderDB.address,
    phone: orderDB.phone,
    email: orderDB.email,
    products: orderDB.products,
    manufacturerId: orderDB.manufacturerId,
    meetingPointId: orderDB.meetingPointId,
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