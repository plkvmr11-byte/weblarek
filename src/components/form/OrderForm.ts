import { Form } from './Form';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';

export type TPayment = 'card' | 'cash';

export interface IOrderForm {
  address: string;
  payment: TPayment;
}

export class OrderForm extends Form<IOrderForm> {
  protected cardButton: HTMLButtonElement;
  protected cashButton: HTMLButtonElement;
  protected addressInput: HTMLInputElement;

  constructor(container: HTMLFormElement, protected events: IEvents) {
    super(container);

    this.cardButton = ensureElement<HTMLButtonElement>(
      'button[name="card"]',
      this.container
    );

    this.cashButton = ensureElement<HTMLButtonElement>(
      'button[name="cash"]',
      this.container
    );

    this.addressInput = ensureElement<HTMLInputElement>(
      'input[name="address"]',
      this.container
    );

    this.cardButton.addEventListener('click', () => {
      this.events.emit('order:payment', { payment: 'card' });
    });

    this.cashButton.addEventListener('click', () => {
      this.events.emit('order:payment', { payment: 'cash' });
    });

    this.addressInput.addEventListener('input', () => {
      this.events.emit('order:address', {
        address: this.addressInput.value,
      });
    });

    this.container.addEventListener('submit', (e: SubmitEvent) => {
      e.preventDefault();
      this.events.emit('order:submit');
    });
  }

  set payment(value: TPayment) {
    this.cardButton.classList.toggle(
      'button_alt-active',
      value === 'card'
    );

    this.cashButton.classList.toggle(
      'button_alt-active',
      value === 'cash'
    );
  }

  set address(value: string) {
    this.addressInput.value = value;
  }
}