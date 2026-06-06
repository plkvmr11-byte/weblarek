import { IProduct } from '../../types';

export class ProductsModel {
  protected _products: IProduct[] = [];
  protected _previewId: string | null = null;

  // Получить список всех товаров
  getProducts(): IProduct[] {
    return this._products;
  }

  // Сохранить массив товаров
  setProducts(products: IProduct[]): void {
    this._products = products;
  }

  // Получить товар по ID
  getProduct(id: string): IProduct | undefined {
    return this._products.find(product => product.id === id);
  }

  // Сохранить выбранную карточку
  setPreview(id: string | null): void {
    this._previewId = id;
  }

  // Получить выбранную карточку
  getPreview(): IProduct | undefined {
    if (!this._previewId) {
      return undefined;
    }

    return this.getProduct(this._previewId);
  }
}