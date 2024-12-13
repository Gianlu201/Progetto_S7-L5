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
