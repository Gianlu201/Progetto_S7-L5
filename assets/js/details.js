const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

const URL = 'https://striveschool-api.herokuapp.com/api/product/';
const MY_KEY =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzEwODA3ZGI3MzAwMTU0MDYzYWUiLCJpYXQiOjE3MzM4NDkzNTIsImV4cCI6MTczNTA1ODk1Mn0.IxpwBRP97dtkPg49zknQcnI0KxCvApjC7sFwneeCp6o';

const productSpace = document.getElementById('productSpace');
let myProduct;

window.onload = async () => {
  try {
    const response = await fetch(URL + productId, {
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

  showProduct(myProduct);
};

function showProduct(product) {
  productSpace.innerHTML = '';
  const newCol1 = document.createElement('div');
  newCol1.classList.add('col-3');

  const newImg = document.createElement('img');
  newImg.src = product.imageUrl;
  newImg.id = 'imgDetails';
  newImg.alt = product.name;

  newCol1.appendChild(newImg);
  productSpace.appendChild(newCol1);

  const newCol2 = document.createElement('div');
  newCol2.classList.add('col-9', 'px-4');

  const newPBrand = document.createElement('p');
  newPBrand.classList.add('h4');
  newPBrand.innerText = product.brand;

  const newH2 = document.createElement('h2');
  newH2.classList.add('mb-3');
  newH2.innerText = product.name;

  const newPrice = document.createElement('span');
  newPrice.classList.add(
    'text-warning',
    'p-1',
    'px-2',
    'bg-black',
    'fs-6',
    'rounded-4'
  );
  newPrice.innerText = `€${product.price}`;

  const newDescription = document.createElement('p');
  newDescription.classList.add('mt-3');
  newDescription.innerText = product.description;

  newCol2.appendChild(newPBrand);
  newCol2.appendChild(newH2);
  newCol2.appendChild(newPrice);
  newCol2.appendChild(newDescription);

  productSpace.appendChild(newCol1);
  productSpace.appendChild(newCol2);
}
