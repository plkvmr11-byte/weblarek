import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';

export interface IBasketView {
  items: HTMLElement[];
  total: number;
}

export interface IBasketActions {
  onOrder: () => void;
}

export class BasketView extends Component<IBasketView> {

  protected listElement: HTMLElement;
  protected totalElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;


  constructor(
    container: HTMLElement,
    events: IEvents,
    actions?: IBasketActions
  ) {
    super(container);


    this.listElement = ensureElement<HTMLElement>(
      '.basket__list',
      this.container
    );


    this.totalElement = ensureElement<HTMLElement>(
      '.basket__price',
      this.container
    );


    this.buttonElement = ensureElement<HTMLButtonElement>(
      '.basket__button',
      this.container
    );


    this.buttonElement.addEventListener('click', () => {
      actions?.onOrder();
    });

  }


  set items(value: HTMLElement[]) {
    this.listElement.replaceChildren(...value);
  }


  set total(value: number) {

    this.totalElement.textContent =
      `${value.toLocaleString('ru-RU')} синапсов`;

  }

}