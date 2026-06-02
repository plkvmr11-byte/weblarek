import { EventEmitter } from '../base/Events';
import { IProduct } from '../../types';

export class ProductsModel extends EventEmitter {
  protected _products: IProduct[] = [];
  protected _previewId: string | null = null;

  constructor() {
    super();
  }

  // Получить список всех товаров
  getProducts(): IProduct[] {
    return this._products;
  }

  // Сохранить массив товаров
  setProducts(products: IProduct[]): void {
    this._products = products;
    this.emit('products:changed', this._products);
  }

  // Получить товар по ID
  getProduct(id: string): IProduct | undefined {
    return this._products.find(product => product.id === id);
  }

  // Сохранить выбранную карточку
  setPreview(id: string | null): void {
    this._previewId = id;
    const previewProduct = this.getPreview();
    this.emit('preview:changed', previewProduct);
  }

  // Получить выбранную карточку
  getPreview(): IProduct | undefined {
    if (!this._previewId) return undefined;
    return this.getProduct(this._previewId);
  }
}