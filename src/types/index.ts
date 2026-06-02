export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

// Тип для способа оплаты
export type TPayment = 'card' | 'cash';

// Тип для категорий товара
export type TCategory = 'софт-скил' | 'хард-скил' | 'кнопка' | 'дополнительное' | 'другое';

// Интерфейс товара
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: TCategory;
  price: number | null;
}

// Интерфейс покупателя
export interface IBuyer {
  payment: TPayment;
  address: string;
  email: string;
  phone: string;
}

// ===== ДЛЯ РАБОТЫ С API =====

// Товар в корзине
export interface ICartItem {
  product: IProduct;
  quantity: number;
}

// Ответ сервера на GET /product/
export interface IProductsResponse {
  total: number;
  items: IProduct[];
}

// Данные заказа для отправки на сервер
export interface IOrder {
  payment: 'online' | 'cash';
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

// Ответ сервера на POST /order/
export interface IOrderResult {
  id: string;
  total: number;
}