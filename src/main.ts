import './scss/styles.scss';

import { ProductsModel } from './components/models/ProductsModel';
import { CartModel } from './components/models/CartModel';
import { BuyerModel } from './components/models/BuyerModel';

import { apiProducts } from './utils/data';
import { IProduct } from './types';

import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { WebLarekApi } from './components/WebLarekApi';

// Создание экземпляров моделей
const productsModel = new ProductsModel();
const cartModel = new CartModel();
const buyerModel = new BuyerModel();

// Данные для проверки моделей
const products = apiProducts.items as IProduct[];

// ===== ПРОВЕРКА PRODUCTSMODEL =====

console.log('=== Проверка ProductsModel ===');

productsModel.setProducts(products);

console.log('Массив товаров:', productsModel.getProducts());

const firstProductId = products[0]?.id;

if (firstProductId) {
  productsModel.setPreview(firstProductId);

  console.log('Выбранный товар:', productsModel.getPreview());
  console.log('Товар по ID:', productsModel.getProduct(firstProductId));
}

// ===== ПРОВЕРКА CARTMODEL =====

console.log('=== Проверка CartModel ===');

const testProduct = products[0];

cartModel.add(testProduct);

console.log('Товары в корзине:', cartModel.getItems());
console.log('Товар есть в корзине:', cartModel.has(testProduct.id));

console.log('Количество товаров:', cartModel.getCount());
console.log('Общая стоимость:', cartModel.getTotal());

cartModel.remove(testProduct.id);

console.log('После удаления:', cartModel.getItems());
console.log('Товар есть после удаления:', cartModel.has(testProduct.id));

cartModel.clear();

console.log('После очистки:', cartModel.getItems());

// ===== ПРОВЕРКА BUYERMODEL =====

console.log('=== Проверка BuyerModel ===');

buyerModel.setPayment('card');
buyerModel.setAddress('Тестовый адрес');
buyerModel.setEmail('test@test.com');
buyerModel.setPhone('+79991234567');

console.log('Данные покупателя:', buyerModel.getBuyer());
console.log('Валидация корректных данных:', buyerModel.validate());

// Проверка невалидных данных
buyerModel.clear();

console.log(
  'Валидация после очистки:',
  buyerModel.validate()
);

console.log('=== ВСЕ ПРОВЕРКИ ЗАВЕРШЕНЫ ===');

// Создание экземпляра базового API
const api = new Api(API_URL);

// Создание экземпляра коммуникационного слоя
const webLarekApi = new WebLarekApi(api);

// Получение товаров с сервера
webLarekApi
  .getProducts()
  .then((data) => {
    productsModel.setProducts(data.items);

    console.log(
      'Каталог товаров, полученный с сервера:',
      productsModel.getProducts()
    );
  })
  .catch((error) => {
    console.error('Ошибка загрузки товаров:', error);
  });