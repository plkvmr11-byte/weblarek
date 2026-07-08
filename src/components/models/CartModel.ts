import { IProduct } from '../../types';
import { EventEmitter } from '../base/Events';

export class CartModel {

  protected items: IProduct[] = [];

  constructor(
    protected events: EventEmitter
  ) {}


  add(product: IProduct): void {

  if (product.price === null) {
    return;
  }


  if (this.has(product.id)) {
    return;
  }


  this.items.push(product);

  this.events.emit('cart:changed');

}


  remove(id: string): void {

  this.items =
    this.items.filter(item => item.id !== id);


  this.events.emit('cart:changed');

}


  clear(): void {

  this.items = [];

  this.events.emit('cart:changed');

}


  getItems(): IProduct[] {
    return this.items;
  }


  getTotal(): number {

    return this.items.reduce(
      (sum, item) => sum + (item.price ?? 0),
      0
    );

  }


  getCount(): number {

    return this.items.length;

  }


  has(id: string): boolean {

    return this.items.some(
      item => item.id === id
    );

  }

}