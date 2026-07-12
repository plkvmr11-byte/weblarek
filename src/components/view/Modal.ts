import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';

export interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected contentElement: HTMLElement;
  protected closeButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.contentElement = ensureElement<HTMLElement>(
      '.modal__content',
      this.container
    );

    this.closeButton = ensureElement<HTMLButtonElement>(
      '.modal__close',
      this.container
    );

    this.closeByEsc = this.closeByEsc.bind(this);

    this.closeButton.addEventListener('click', () => {
      this.close();
    });

    this.container.addEventListener('click', (e: MouseEvent) => {
      if (e.target === this.container) {
        this.close();
      }
    });
  }

  protected closeByEsc(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  open(): void {
    this.container.classList.add('modal_active');
    document.addEventListener('keydown', this.closeByEsc);
  }

  close(): void {
    this.container.classList.remove('modal_active');
    this.contentElement.replaceChildren();
    document.removeEventListener('keydown', this.closeByEsc);

    this.events.emit('modal:close');
  }

  set content(value: HTMLElement) {
    this.contentElement.replaceChildren(value);
  }
}