import { Card } from './Card';
import { ensureElement } from '../../utils/utils';

export interface ICardActions {
  onRemove: () => void;
}

export class CardBasket extends Card {
  protected indexElement: HTMLElement;
  protected deleteButton: HTMLButtonElement

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.indexElement = ensureElement<HTMLElement>('.basket__item-index', container);
    this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

    this.deleteButton.addEventListener('click', () => {
      actions?.onRemove?.();
    });
  }

  set index(value: number) {
    this.indexElement.textContent = String(value);
  }

}