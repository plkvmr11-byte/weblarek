import { Card } from './Card';
import { ensureElement } from '../../utils/utils';
import { categoryMap } from '../../utils/constants';
import { IProduct } from '../../types';

type CategoryKey = keyof typeof categoryMap;
export type TCardPreview = Pick<IProduct, 'image' | 'category' | 'description'>;

export interface ICardActions {
  onAdd: () => void;
}

export class CardPreview extends Card {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;
  protected descriptionElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.imageElement = ensureElement<HTMLImageElement>(
      '.card__image',
      this.container
    );

    this.categoryElement = ensureElement<HTMLElement>(
      '.card__category',
      this.container
    );

    this.descriptionElement = ensureElement<HTMLElement>(
      '.card__text',
      this.container
    );

    this.buttonElement = ensureElement<HTMLButtonElement>(
      '.card__button',
      this.container
    );

    this.buttonElement.addEventListener('click', () => {
      actions?.onAdd?.();
    });
  }

  set image(value: string) {
    this.imageElement.src = value;
    this.imageElement.alt = this.title;
  }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  set category(value: CategoryKey) {
  this.categoryElement.textContent = value;

  this.categoryElement.className =
    `card__category ${categoryMap[value]}`;
}

  set buttonText(value: string) {
    this.buttonElement.textContent = value;
  }

  set disabled(state: boolean) {
    this.buttonElement.disabled = state;
  }
}


