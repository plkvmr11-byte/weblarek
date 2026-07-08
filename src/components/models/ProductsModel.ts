import { IProduct } from '../../types';
import { EventEmitter } from '../base/Events'; 

export class ProductsModel {
  protected _products: IProduct[] = [];
  protected _preview: IProduct | null = null;
  protected events: EventEmitter; 
  
  constructor(events: EventEmitter) { 
    this.events = events; 
  } 

  // Получить список всех товаров
  getProducts(): IProduct[] {
    return this._products;
  }

  // Сохранить массив товаров
  setProducts(products: IProduct[]): void {
    this._products = products;
    this.events.emit('catalog:changed');
  }

  // Получить товар по ID
  getProduct(id: string): IProduct | undefined {
    return this._products.find(product => product.id === id);
  }

  // Сохранить выбранную карточку
  setPreview(product: IProduct | null): void {
    this._preview = product;
    this.events.emit('product:preview');
  }

  // Получить выбранную карточку
  getPreview(): IProduct | undefined {
    return this._preview ?? undefined;
  }
}