import { environment } from "../../../environments/environment";

export const API_CONFIG = {
  BASE_URL: environment.apiUrl,
  MANUFACTURERS_URL: '/manufacturers',
  PRODUCTS_URL: '/products',
  ORDERS_URL: '/orders',
  USERS_URL: '/users',
  CATEGORIES_URL: '/categories',
  LOGIN_URL: '/login',
  MEETING_POINTS_URL: '/meeting-points',
  PRODUCT_IMAGES_URL: '/product-images',
}