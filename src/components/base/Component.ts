/**
 * Базовый компонент
 */
export abstract class Component<T> {
    protected constructor(protected readonly container: HTMLElement) {
        // Учитывайте что код в конструкторе исполняется ДО всех объявлений в дочернем классе
    }

    // Инструментарий для работы с DOM в дочерних компонентах

    // Установить изображение с альтернативным текстом
    protected setImage(element: HTMLImageElement, src: string, alt?: string) {
        if (element) {
            element.src = src;
            if (alt) {
                element.alt = alt;
            }
        }
    }

    //Установить текстовое содержимое элемента 
    protected setText(element: HTMLElement, value: string | number): void { 
        if (element) { 
            element.textContent = String(value); 
        } 
    } 

    // Добавление или удаление CSS-класса 
    protected toggleClass(element: HTMLElement, className: string, force?: boolean): void { 
        if (element) {
            element.classList.toggle(className, force); 
        } 
    }

    // Установить скрытие элемента
    protected setHidden(element: HTMLElement): void {
        element.style.display = 'none';
    }

    // Установить видимость элемента
    protected setVisible(element: HTMLElement): void {
        element.style.display = '';
    }

    // Установить состояние disabled для элемента
    protected setDisabled(element: HTMLElement, state: boolean): void {
        if (state) {
        element.setAttribute('disabled', 'disabled');
        }   else {
        element.removeAttribute('disabled');
        }
    }

    // Вернуть корневой DOM-элемент
    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }

    get element(): HTMLElement { 
        return this.container; 
    } 
}
