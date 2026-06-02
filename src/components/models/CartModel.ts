import { EventEmitter } from '../base/Events';
import { IProduct } from '../../types';

// Внутренний тип для товара в корзине
interface ICartItem {
  product: IProduct;
  quantity: number;
}

export class CartModel extends EventEmitter {
  protected _items: Map<string, ICartItem> = new Map();

  constructor() {
    super();
  }

  // Добавить товар в корзину
  add(product: IProduct): void {
    if (product.price === null) return;

    if (this._items.has(product.id)) {
      const item = this._items.get(product.id)!;
      item.quantity += 1;
    } else {
      this._items.set(product.id, { product, quantity: 1 });
    }
    this.emit('cart:changed');
  }

  // Удалить товар из корзины по ID
  remove(id: string): void {
    this._items.delete(id);
    this.emit('cart:changed');
  }

  // Очистить корзину
  clear(): void {
    this._items.clear();
    this.emit('cart:changed');
  }

  // Получить список товаров в корзине
  getItems(): { product: IProduct; quantity: number }[] {
    return Array.from(this._items.values());
  }

  // Получить общую стоимость всех товаров
  getTotal(): number {
    return this.getItems().reduce(
      (sum, item) => sum + (item.product.price || 0) * item.quantity,
      0
    );
  }

  // Получить количество товаров в корзине
  getCount(): number {
    return this.getItems().reduce((sum, item) => sum + item.quantity, 0);
  }

  // Проверить, есть ли товар в корзине
  has(id: string): boolean {
    return this._items.has(id);
  }
}