import './scss/styles.scss';

import { IProduct, TPayment } from './types';
import { CDN_URL, API_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

import { EventEmitter } from './components/base/Events';

import { ProductsModel } from './components/models/ProductsModel';
import { CartModel } from './components/models/CartModel';
import { BuyerModel } from './components/models/BuyerModel';

import { Api } from './components/base/Api';
import { WebLarekApi } from './components/WebLarekApi';

import { Gallery } from './components/view/Gallery';
import { Header } from './components/view/Header';
import { Modal } from './components/view/Modal';
import { Success } from './components/view/Success';
import { BasketView } from './components/view/BasketView';

import { OrderForm } from './components/form/OrderForm';
import { ContactsForm } from './components/form/ContactsForm';

import { CardCatalog } from './components/card/CardCatalog';
import { CardPreview } from './components/card/CardPreview';
import { CardBasket } from './components/card/CardBasket';

const events = new EventEmitter();

const productsModel = new ProductsModel(events);
const cartModel = new CartModel(events);
const buyerModel = new BuyerModel(events);

const api = new Api(API_URL);
const webApi = new WebLarekApi(api);

const cardCatalogTpl = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTpl = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTpl = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTpl = ensureElement<HTMLTemplateElement>('#basket');
const orderTpl = ensureElement<HTMLTemplateElement>('#order');
const contactsTpl = ensureElement<HTMLTemplateElement>('#contacts');
const successTpl = ensureElement<HTMLTemplateElement>('#success');

const gallery = new Gallery(
  ensureElement('.gallery')
);

const header = new Header(
  ensureElement('.header'),
  {
    onBasketClick: () => events.emit('basket:open')
  }
);

const modal = new Modal(
  ensureElement('#modal-container'),
  events
);

const basket = new BasketView(
  cloneTemplate(basketTpl),
  events,
  {
    onOrder: () => {
      events.emit('basket:checkout');
    }
  }
);

const orderForm = new OrderForm(
  cloneTemplate(orderTpl),
  events
);

const contactsForm = new ContactsForm(
  cloneTemplate(contactsTpl),
  events
);

const success = new Success(
  cloneTemplate(successTpl),
  () => events.emit('success:close')
);

const preview = new CardPreview(
  cloneTemplate(cardPreviewTpl),
  {
    onAdd: () => events.emit('preview:add')
  }
);

events.on('success:close', () => {
  modal.close();
});


webApi.getProducts()
  .then((data: { items: IProduct[] }) => {
    const products = data.items.map(item => ({
      ...item,
      image: `${CDN_URL}${item.image}`
    }));

    productsModel.setProducts(products);
  });

// ================== CATALOG ==================

events.on('catalog:changed', () => {
  const cards = productsModel.getProducts().map((item) => {
    const card = new CardCatalog(
      cloneTemplate(cardCatalogTpl),
      {
        onClick: () => events.emit('card:select', { id: item.id })
      }
    );

    return card.render(item);
  });

  gallery.render({
    items: cards
  });
});

// ================== PREVIEW ==================

events.on<{ id: string }>('card:select', ({ id }) => {
  const product = productsModel.getProduct(id);

  if (product) {
    productsModel.setPreview(product);
  }
});


events.on('product:preview', () => {
  const product = productsModel.getPreview();

  if (!product) return;

  modal.content = preview.render({
    ...product,
    buttonText:
      product.price === null
        ? 'Недоступно'
        : cartModel.has(product.id)
          ? 'Удалить из корзины'
          : 'Купить',
    disabled: product.price === null
  });

  modal.open();
});


events.on('preview:add', () => {
  const product = productsModel.getPreview();

  if (!product) return;

  if (cartModel.has(product.id)) {
    cartModel.remove(product.id);
  } else {
    cartModel.add(product);
  }

  modal.close();
});

// ================== CART ==================

events.on('cart:changed', () => {
  header.counter = cartModel.getCount();
});

// ================== BASKET ==================

events.on('basket:open', () => {
  modal.content = basket.render();

  modal.open();
});

events.on('cart:changed', () => {
  const cards = cartModel.getItems().map((item, index) => {
    const card = new CardBasket(
      cloneTemplate(cardBasketTpl),
      {
        onRemove: () => events.emit('basket:remove', {
          id: item.id
        })
      }
    );

    return card.render({
      ...item,
      index: index + 1
    });
  });

  modal.content = basket.render({
    items: cards,
    total: cartModel.getTotal(),
    disabled: cartModel.getCount() === 0
  });
});

events.on<{ id: string }>('basket:remove', ({ id }) => {
  cartModel.remove(id);
});

// ================== ORDER ==================

events.on('basket:checkout', () => {
  const buyer = buyerModel.getBuyer();

  modal.content = orderForm.render({
    address: buyer.address,
    payment: buyer.payment
  });

  orderForm.valid = false;
  orderForm.errors = '';

  modal.open();
});

// ================== ORDER DATA ==================
 
events.on('order:payment', ({ payment }: { payment: TPayment }) => {
  buyerModel.setPayment(payment);
});


events.on('order:address', ({ address }: { address: string }) => {
  buyerModel.setAddress(address);
});


// ================== BUYER UPDATE ==================

events.on('buyer:changed', () => {
  const buyer = buyerModel.getBuyer();

  const orderErrors = buyerModel.validateOrder();

  if (buyer.payment) {
    orderForm.payment = buyer.payment;
  }

  orderForm.address = buyer.address;

  orderForm.errors = Object.values(orderErrors)
    .filter(Boolean)
    .join(', ');

  orderForm.valid =
    !orderErrors.address;


  const contactsErrors = buyerModel.validateContacts();

  contactsForm.email = buyer.email;
  contactsForm.phone = buyer.phone;

  contactsForm.errors = Object.values(contactsErrors)
    .filter(Boolean)
    .join(', ');

  contactsForm.valid =
    !contactsErrors.email &&
    !contactsErrors.phone;
});

// ================== NEXT STEP ==================

events.on('order:submit', () => {
  const buyer = buyerModel.getBuyer();

  modal.content = contactsForm.render({
    email: buyer.email,
    phone: buyer.phone
  });

  modal.open();
});

// ================== CONTACT FORM ==================

events.on('contacts:email', ({ email }: { email: string }) => {
  buyerModel.setEmail(email);
});


events.on('contacts:phone', ({ phone }: { phone: string }) => {
  buyerModel.setPhone(phone);
});


// ================== SEND ORDER ==================

events.on('contacts:submit', () => {

  const buyer = buyerModel.getBuyer();

  webApi.postOrder({
    payment: buyer.payment!,
    address: buyer.address,
    email: buyer.email,
    phone: buyer.phone,
    total: cartModel.getTotal(),
    items: cartModel
      .getItems()
      .map(item => item.id)
  })
    .then((result) => {
      cartModel.clear();
      buyerModel.clear();

      modal.content = success.render({
        total: result.total
      });

      modal.open();
    })
    .catch(console.error);
});