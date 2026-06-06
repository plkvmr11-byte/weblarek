import { IBuyer, TPayment, TBuyerErrors } from '../../types';

export class BuyerModel {
  protected payment: TPayment | null = null;
  protected address = '';
  protected email = '';
  protected phone = '';

  // Сохранить способ оплаты
  setPayment(method: TPayment): void {
    this.payment = method;
  }

  // Сохранить адрес
  setAddress(address: string): void {
    this.address = address;
  }

  // Сохранить email
  setEmail(email: string): void {
    this.email = email;
  }

  // Сохранить телефон
  setPhone(phone: string): void {
    this.phone = phone;
  }

  // Получить данные покупателя
getBuyer(): IBuyer {
  return {
    payment: this.payment,
    address: this.address,
    email: this.email,
    phone: this.phone,
  };
}

  // Очистить данные
  clear(): void {
    this.payment = null;
    this.address = '';
    this.email = '';
    this.phone = '';
  }

  // Проверить валидность данных
  validate(): TBuyerErrors {
    const errors: TBuyerErrors = {};

    if (!this.payment) {
      errors.payment = 'Не выбран способ оплаты';
    }

    if (!this.address.trim()) {
      errors.address = 'Укажите адрес доставки';
    }

    if (!this.email.trim()) {
      errors.email = 'Укажите email';
    }

    if (!this.phone.trim()) {
      errors.phone = 'Укажите телефон';
    }

    return errors;
  }
}