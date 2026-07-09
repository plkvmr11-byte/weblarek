import { IBuyer, TPayment, TBuyerErrors } from '../../types';
import { EventEmitter } from '../base/Events';


export class BuyerModel {

  protected payment: TPayment | null = null;
  protected address = '';
  protected email = '';
  protected phone = '';
  protected events: EventEmitter;

  constructor(events: EventEmitter) {
    this.events = events;
  }

  setPayment(method: TPayment): void {
    this.payment = method;
    this.events.emit('buyer:changed');

  }

  setAddress(address: string): void {
    this.address = address;
    this.events.emit('buyer:changed');
  }

  setEmail(email: string): void {
    this.email = email;
    this.events.emit('buyer:changed');
  }

  setPhone(phone: string): void {
    this.phone = phone;
    this.events.emit('buyer:changed');
  }

  // ================== GET DATA ==================

  getBuyer(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      email: this.email,
      phone: this.phone,
    };
  }

  // ================== CLEAR ==================

  clear(): void {
    this.payment = null;
    this.address = '';
    this.email = '';
    this.phone = '';
    this.events.emit('buyer:changed');
  }

  // ================== VALIDATION ORDER ==================

  validateOrder(): TBuyerErrors {
    const errors: TBuyerErrors = {};
    if (!this.address.trim()) {
      errors.address = 'Необходимо указать адрес';
    }
    return errors;
  }

  // ================== VALIDATION CONTACTS ==================

  validateContacts(): TBuyerErrors {
    const errors: TBuyerErrors = {};
    if (!this.email.trim()) {
      errors.email = 'Укажите email';
    }
    if (!this.phone.trim()) {
      errors.phone = 'Укажите телефон';
    }

    return errors;
  }

  // ================== FULL VALIDATION ==================

  validate(): TBuyerErrors {
    return {
      ...this.validateOrder(),
      ...this.validateContacts(),
    };
  }
}