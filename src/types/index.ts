export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods
  ): Promise<T>;
}

// Тип для способа оплаты
export type TPayment = 'card' | 'cash';


// Интерфейс товара
export interface IProduct {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number | null;
}

// Интерфейс покупателя
export interface IBuyer {
  payment: TPayment | null;
  address: string;
  email: string;
  phone: string;
}

// Ошибки валидации покупателя
export type TBuyerErrors = Partial<Record<keyof IBuyer, string>>;


// ===== ДЛЯ РАБОТЫ С API =====

// Ответ сервера на GET /product/
export interface IProductsResponse {
  total: number;
  items: IProduct[];
}

// Данные заказа для отправки на сервер
export interface IOrder extends Omit<IBuyer, 'payment'> {
  payment: TPayment;
  total: number;
  items: string[];
}

// Ответ сервера на POST /order/
export interface IOrderResult {
  id: string;
  total: number;
}