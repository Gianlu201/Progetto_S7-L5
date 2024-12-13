const URL = 'https://striveschool-api.herokuapp.com/api/product/';
const MY_KEY =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzEwODA3ZGI3MzAwMTU0MDYzYWUiLCJpYXQiOjE3MzM4NDkzNTIsImV4cCI6MTczNTA1ODk1Mn0.IxpwBRP97dtkPg49zknQcnI0KxCvApjC7sFwneeCp6o';

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

const title = document.getElementById('title');
const myForm = document.getElementById('myForm');
const productName = document.getElementById('name');
const productBrand = document.getElementById('brand');
const productPrice = document.getElementById('price');
const productImageURL = document.getElementById('imageURL');
const productDescription = document.getElementById('description');
const btnSendForm = document.getElementById('sendForm');
let myProduct;

class Product {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

window.onload = () => {
  if (productId) {
    title.innerText = 'Edit product';
    getProduct(productId);
  } else {
    title.innerText = 'Add product';
  }
};

async function getProduct(myId) {
  try {
    const response = await fetch(URL + myId, {
      method: 'GET',
      headers: {
        Authorization: MY_KEY,
        'Content-type': 'application/json; charset= UTF-8',
      },
    });
    const data = await response.json();
    myProduct = data;
  } catch (errore) {
    console.log(errore);
  }

  showProductInfo(myProduct);
}

function showProductInfo(product) {
  productName.value = product.name;
  productBrand.value = product.brand;
  productPrice.value = product.price;
  productImageURL.value = product.imageUrl;
  productDescription.value = product.description;
}

btnSendForm.addEventListener('click', (e) => {
  e.preventDefault();
  if (productId) {
    sendToAPI('PUT', createMyObj(), productId);
  } else {
    sendToAPI('POST', createMyObj(), '');
  }
});

async function sendToAPI(method, obj, myId) {
  try {
    const response = await fetch(URL + myId, {
      method: method,
      headers: {
        Authorization: MY_KEY,
        'Content-type': 'application/json; charset= UTF-8',
      },
      body: JSON.stringify(obj),
    });
    console.log(response);
    // const data = await response.json();
    // myProduct = data;
  } catch (errore) {
    console.log(errore);
  }
  myForm.reset();
}

function createMyObj() {
  const name = productName.value;
  const brand = productBrand.value;
  const price = parseInt(productPrice.value);
  const url = productImageURL.value;
  const description = productDescription.value;

  const myObj = new Product(name, description, brand, url, price);
  return myObj;
}
