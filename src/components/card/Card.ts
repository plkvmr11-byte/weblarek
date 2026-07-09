import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';

export interface ICard {
    id: string;
    title: string;
    price: number | null;
    image?: string;
    category?: string;
    buttonText?: string;
    disabled?: boolean;
    description?: string;
    index?: number;
}

export class Card extends Component<ICard> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this.titleElement = ensureElement('.card__title', this.container);
        this.priceElement = ensureElement('.card__price', this.container);
    }

    // ===== ID =====
    set id(value: string) {
        this.container.dataset.id = value;
    }

    // ===== TITLE =====
    set title(value: string) {
        this.titleElement.textContent = value;
    }

    // ===== PRICE =====
    set price(value: number | null) {
        if (value === null) {
            this.priceElement.textContent = 'Бесценно';
        } else {
            this.priceElement.textContent = `${value.toLocaleString('ru-RU')} синапсов`;
        }
    }

    // ===== IMAGE =====
    set image(value: string) {
        const img = this.container.querySelector('.card__image') as HTMLImageElement;
        if (img) {
            img.src = value;
            img.alt = this.title;
        }
    }

    // ===== CATEGORY =====
    set category(value: string) {
        const el = this.container.querySelector('.card__category') as HTMLElement;
        if (el) {
            el.textContent = value;
            el.className = `card__category card__category_${value}`;
        }
    }

    // ===== BUTTON TEXT =====
    set buttonText(value: string) {
        const button = this.container.querySelector('.card__button') as HTMLButtonElement;

        if (button) {
            button.textContent = value;
        }
    }

    // ===== DISABLED =====
    set disabled(value: boolean) {
        const button = this.container.querySelector('.card__button') as HTMLButtonElement;

        if (button) {
            button.disabled = value;
        }
    }

    // ===== RENDER (ВАЖНО) =====
    render(data: Partial<ICard>): HTMLElement {
        Object.assign(this, data);
        return this.container;
    }
}