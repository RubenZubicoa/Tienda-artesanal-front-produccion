import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../core/config/api.config';
import { AddOrder, Order, OrderDB, UpdateOrder, mapOrderToOrder } from '../../core/models/Order';
import { map, Observable } from 'rxjs';
import { Manufacturer } from '../../core/models/Manufacturer';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly http = inject(HttpClient);
  private readonly url = API_CONFIG.BASE_URL + API_CONFIG.ORDERS_URL;

  getOrders(): Observable<Order[]> {
    return this.http.get<OrderDB[]>(this.url).pipe(map(orders => orders.map(mapOrderToOrder)));
  }

  getOrder(orderId: Order['uuid']): Observable<Order> {
    return this.http.get<OrderDB>(this.url + '/' + orderId).pipe(map(mapOrderToOrder));
  }

  getOrdersByEmail(email: string): Observable<Order[]> {
    return this.http.get<OrderDB[]>(this.url + '/email/' + email).pipe(map(orders => orders.map(mapOrderToOrder)));
  }

  getOrdersByManufacturer(manufacturerId: Manufacturer['uuid']): Observable<Order[]> {
    return this.http.get<OrderDB[]>(this.url + '/manufacturer/' + manufacturerId).pipe(map(orders => orders.map(mapOrderToOrder)));
  }

  createOrder(order: AddOrder): Observable<void> {
    return this.http.post<void>(this.url, order);
  }

  updateOrder(order: UpdateOrder): Observable<void> {
    return this.http.put<void>(this.url, order);
  }

  deleteOrder(orderId: Order['uuid']): Observable<void> {
    return this.http.delete<void>(this.url + '/' + orderId);
  }
}
