import { EventEmitter } from '../base/Events';
import { IBuyer } from '../../types';

export class BuyerModel extends EventEmitter {
  protected _payment: 'card' | 'cash' | null = null;
  protected _address: string = '';
  protected _email: string = '';
  protected _phone: string = '';

  constructor() {
    super();
  }

  // Сохранить способ оплаты
  setPayment(method: 'card' | 'cash'): void {
    this._payment = method;
    this.emit('buyer:changed');
  }

  // Сохранить адрес
  setAddress(address: string): void {
    this._address = address;
    this.emit('buyer:changed');
  }

  // Сохранить email
  setEmail(email: string): void {
    this._email = email;
    this.emit('buyer:changed');
  }

  // Сохранить телефон
  setPhone(phone: string): void {
    this._phone = phone;
    this.emit('buyer:changed');
  }

  // Получить все данные покупателя
  getBuyer(): IBuyer {
    return {
      payment: this._payment!,
      address: this._address,
      email: this._email,
      phone: this._phone,
    };
  }

  // Очистить все данные
  clear(): void {
    this._payment = null;
    this._address = '';
    this._email = '';
    this._phone = '';
    this.emit('buyer:changed');
  }

  // Проверить валидность данных
  validate(): Partial<Record<keyof IBuyer, string>> {
    const errors: Partial<Record<keyof IBuyer, string>> = {};

    if (!this._payment) {
      errors.payment = 'Не выбран способ оплаты';
    }
    if (!this._address.trim()) {
      errors.address = 'Укажите адрес доставки';
    }
    if (!this._email.trim()) {
      errors.email = 'Укажите email';
    }
    if (!this._phone.trim()) {
      errors.phone = 'Укажите телефон';
    }

    return errors;
  }
}