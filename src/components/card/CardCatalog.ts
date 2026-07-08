import { Card } from './Card';
import { ensureElement } from '../../utils/utils';

export interface ICardActions {
  onClick: () => void;
}

export class CardCatalog extends Card {

  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;

  constructor(
    container: HTMLElement,
    actions?: ICardActions
  ) {
    super(container);

    this.imageElement = ensureElement<HTMLImageElement>(
      '.card__image',
      this.container
    );

    this.categoryElement = ensureElement<HTMLElement>(
      '.card__category',
      this.container
    );

    if (actions?.onClick) {
      this.container.addEventListener('click', actions.onClick);
    }
  }

  set image(value: string) {
    this.imageElement.src = value;
    this.imageElement.alt = this.title;
  }

  set category(value: string) {
    this.categoryElement.textContent = value;
  }
}