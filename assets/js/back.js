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
const btnDelete = document.getElementById('delete');
const btnResetForm = document.getElementById('resForm');
const btnSendForm = document.getElementById('sendForm');
const btnModalConfirm = document.getElementById('confirm');
const btnResConfirm = document.getElementById('reseButt');

let myProduct;

const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);

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
    btnSendForm.setAttribute('onclick', 'console.log("ciao")');
    btnDelete.removeAttribute('hidden');
    getOrSetProduct('GET', productId);
  } else {
    title.innerText = 'Add product';
  }
};

async function getOrSetProduct(method, myId) {
  try {
    const response = await fetch(URL + myId, {
      method: method,
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

btnResetForm.addEventListener('click', (e) => {
  e.preventDefault();
});

btnSendForm.addEventListener('click', (e) => {
  e.preventDefault();
  if (validationInputs()) {
    if (productId) {
      sendToAPI('PUT', createMyObj(), productId);
    } else {
      sendToAPI('POST', createMyObj(), '');
    }
  }
});

btnDelete.addEventListener('click', (e) => {
  e.preventDefault();
});

btnModalConfirm.addEventListener('click', () => {
  getOrSetProduct('DELETE', productId);
  setTimeout(() => {
    myForm.reset();
  }, 500);
});

btnResConfirm.addEventListener('click', () => {
  myForm.reset();
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

function validationInputs() {
  const myInputs = [
    productName,
    productBrand,
    productPrice,
    productImageURL,
    productDescription,
  ];
  const myValidation = [
    'nameValidation',
    'brandValidation',
    'priceValidation',
    'urlValidation',
    'descriptionValidation',
  ];

  for (let i = 0; i < myInputs.length; i++) {
    if (myInputs[i].value === '' || myInputs[i].value == null) {
      showPopOver(myValidation[i]);
      return false;
    }
    if (myInputs[i] == productPrice) {
      if (productPrice.value != parseInt(productPrice.value)) {
        showPopOver('priceIntValidation');
        return false;
      }
    }
  }

  return true;
}

async function showPopOver(validation) {
  document.getElementById(validation).click();
  setTimeout(() => {
    document.getElementById(validation).click();
  }, 3000);
}
