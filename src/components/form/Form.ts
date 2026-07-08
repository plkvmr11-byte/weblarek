import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';

export class Form<T> extends Component<T> {
  protected submitButton: HTMLButtonElement;
  protected errorElement: HTMLElement;

  constructor(container: HTMLFormElement) {
    super(container);

    this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', container);
    this.errorElement = ensureElement<HTMLElement>('.form__errors', container);
  }

  set valid(value: boolean) {
    this.submitButton.disabled = !value;
  }

  set errors(value: string) {
    this.errorElement.textContent = value;
  }
}