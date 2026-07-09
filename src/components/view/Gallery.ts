import { Component } from '../base/Component';

export interface IGallery {
  items: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
  protected catalogElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.catalogElement = this.container;
  }

  set items(value: HTMLElement[]) {
    this.catalogElement.replaceChildren(...value);
  }

  clear() {
    this.catalogElement.replaceChildren();
  }
}