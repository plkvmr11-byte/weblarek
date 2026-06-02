import { IApi } from '../types';
import { IProductsResponse, IOrder, IOrderResult } from '../types';

export class WebLarekApi {
  private _api: IApi;

  constructor(api: IApi) {
    this._api = api;
  }

  // GET-запрос: получить список товаров
  getProducts(): Promise<IProductsResponse> {
    return this._api.get('/product/') as Promise<IProductsResponse>;
  }

  // POST-запрос: отправить заказ
  postOrder(order: IOrder): Promise<IOrderResult> {
    return this._api.post('/order/', order) as Promise<IOrderResult>;
  }
}