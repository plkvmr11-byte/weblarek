import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';

export interface IGallery {
  items: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
  protected catalogElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.catalogElement = ensureElement<HTMLElement>(
      '.gallery__list',
      this.container
    );
  }

  set items(value: HTMLElement[]) {
    this.catalogElement.replaceChildren(...value);
  }

  clear() {
    this.catalogElement.replaceChildren();
  }
}