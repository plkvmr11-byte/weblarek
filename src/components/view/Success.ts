import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';

export interface ISuccess {
  total: number;
}

export class Success extends Component<ISuccess> {
  protected descriptionElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, protected onClose?: () => void) {
    super(container);

    this.descriptionElement = ensureElement<HTMLElement>('.order-success__description', this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

    this.buttonElement.addEventListener('click', () => {
      this.onClose?.();
    });
  }

  set total(value: number) {
    this.descriptionElement.textContent =
      `Списано ${value} синапсов`;
  }
}

