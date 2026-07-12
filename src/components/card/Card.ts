import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';

export interface ICard {
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

    // ===== RENDER =====
    render(data: Partial<ICard>): HTMLElement {
        Object.assign(this, data);
        return this.container;
    }
}