import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';

export interface IHeader {
  counter: number;
}

export interface IHeaderActions {
  onBasketClick: () => void;
}

export class Header extends Component<IHeader> {
  protected basketButton: HTMLButtonElement;
  protected counterElement: HTMLElement;

  constructor(container: HTMLElement, actions?: IHeaderActions) {
    super(container);

    this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);
    this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', this.container);

    this.basketButton.addEventListener('click', () => {
      actions?.onBasketClick?.();
    });
  }

  set counter(value: number) {
    this.counterElement.textContent = String(value);
  }
}