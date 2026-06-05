import { IProduct } from '../../types';

export class CartModel {
  protected items: IProduct[] = [];

  // Добавить товар в корзину
  add(product: IProduct): void {
    if (product.price === null) {
      return;
    }

    if (this.has(product.id)) {
      return;
    }

    this.items.push(product);
  }

  // Удалить товар
  remove(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  // Очистить корзину
  clear(): void {
    this.items = [];
  }

  // Получить товары
  getItems(): IProduct[] {
    return this.items;
  }

  // Получить общую стоимость
  getTotal(): number {
    return this.items.reduce(
      (sum, item) => sum + (item.price ?? 0),
      0
    );
  }

  // Получить количество товаров
  getCount(): number {
    return this.items.length;
  }

  // Проверить наличие товара
  has(id: string): boolean {
    return this.items.some(item => item.id === id);
  }
}