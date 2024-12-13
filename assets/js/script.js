const productsSpace = document.getElementById('productsSpace');

const URL = 'https://striveschool-api.herokuapp.com/api/product/';
const MY_KEY =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzEwODA3ZGI3MzAwMTU0MDYzYWUiLCJpYXQiOjE3MzM4NDkzNTIsImV4cCI6MTczNTA1ODk1Mn0.IxpwBRP97dtkPg49zknQcnI0KxCvApjC7sFwneeCp6o';

const productsList = [];

window.onload = async () => {
  try {
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        Authorization: MY_KEY,
        'Content-type': 'application/json; charset= UTF-8',
      },
    });
    const data = await response.json();
    data.forEach((element) => {
      productsList.push(element);
    });
    if (productsList.length > 0) {
      showProducts();
    }
  } catch (errore) {
    console.log(errore);
  }
};

function showProducts() {
  productsSpace.innerHTML = '';
  productsList.forEach((element) => {
    const newCol = document.createElement('div');
    newCol.classList.add('col-6', 'col-lg-4', 'col-xl-3', 'mb-4');

    const newCard = document.createElement('div');
    newCard.classList.add('card');

    const newImg = document.createElement('img');
    newImg.src = element.imageUrl;
    newImg.classList.add('card-img-top');

    const newBody = document.createElement('div');
    newBody.classList.add('card-body');

    const newH5 = document.createElement('h5');
    newH5.classList.add('card-title');
    newH5.innerText = element.name;

    const newText = document.createElement('p');
    newText.classList.add('card-text');
    newText.innerText = element.description;

    const newDiv = document.createElement('div');
    newDiv.classList.add('d-flex', 'justify-content-around');

    const newBtnModify = document.createElement('button');
    newBtnModify.setAttribute('type', 'button');
    newBtnModify.classList.add('btn', 'btn-warning');
    newBtnModify.innerText = 'Modifica';
    newBtnModify.setAttribute('onclick', `modifyProduct("${element._id}")`);

    const newBtnMore = document.createElement('button');
    newBtnMore.setAttribute('type', 'button');
    newBtnMore.classList.add('btn', 'btn-info');
    newBtnMore.innerText = 'Scopri di più';
    newBtnMore.setAttribute('onclick', `showMore("${element._id}")`);

    newCard.appendChild(newImg);
    newBody.appendChild(newH5);
    newBody.appendChild(newText);
    newDiv.appendChild(newBtnModify);
    newDiv.appendChild(newBtnMore);
    newBody.appendChild(newDiv);
    newCard.appendChild(newBody);
    newCol.appendChild(newCard);

    productsSpace.appendChild(newCol);
  });
}

function modifyProduct(myId) {
  window.location = `back.html?id=${myId}`;
}

function showMore(myId) {
  window.location = `details.html?id=${myId}`;
}
