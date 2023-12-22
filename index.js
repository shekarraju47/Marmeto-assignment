const ListMainEl = document.getElementById("itemsContainer");
let inputSearchEl = document.getElementById("inputSearch");
let gridIconsEl = document.getElementById("gridIcons");
let listIconsEl = document.getElementById("listIcons");

gridIconsEl.addEventListener("click", () => {
  console.log("clickesF");
  ListMainEl.classList.add("listContainer");
});

listIconsEl.addEventListener("click", (e) => {
  ListMainEl.classList.remove("listContainer");
});

// console.log(data);
const api = "https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093";
const options = {
  method: "get",
};

const CreateList = (data) => {
  const createLi = document.createElement("li");
  createLi.classList = "listItem";
  ListMainEl.classList = "listContainer";
  ListMainEl.appendChild(createLi);

  const imgAndBadgCont = document.createElement("div");
  imgAndBadgCont.classList = "itemImg";
  createLi.appendChild(imgAndBadgCont);

  const producBadge = document.createElement("p");
  producBadge.textContent = data.product_badge;
  producBadge.classList = "badgePara";
  imgAndBadgCont.appendChild(producBadge);

  const productImg = document.createElement("img");
  productImg.src = data.product_image;
  productImg.alt = "Img";
  imgAndBadgCont.appendChild(productImg);

  const detailsProduct = document.createElement("div");
  detailsProduct.classList = "rightCardCont";
  createLi.appendChild(detailsProduct);
  const createTitle = document.createElement("h1");
  createTitle.classList = "productTitle";
  createTitle.textContent = data.product_title;
  detailsProduct.appendChild(createTitle);
  for (let i of data.product_variants) {
    if (i.v1 !== undefined) {
      const v1 = document.createElement("p");
      v1.classList = "varientPara";
      v1.textContent = i.v1;
      detailsProduct.appendChild(v1);
    } else if (i.v2 !== undefined) {
      const v2 = document.createElement("p");
      v2.classList = "varientPara";
      v2.textContent = i.v2;
      detailsProduct.appendChild(v2);
    } else {
      const v3 = document.createElement("p");
      v3.classList = "varientPara";
      v3.textContent = i.v3;
      detailsProduct.appendChild(v3);
    }

    // const v2 = document.createElement("p");
    // v2.classList = "varientPara";
    // v2.textContent = !i.v1 && i.v3 ? i.v2 : "";
    // detailsProduct.appendChild(v2);
    // const v3 = document.createElement("p");
    // v3.classList = "varientPara";
    // v3.textContent = i.v3;
    // detailsProduct.appendChild(v3);
  }
};

const getAllData = (jsonData) => {
  for (let i of jsonData.data) {
    const re = i.product_title.includes(inputSearchEl.value);

    CreateList(i);
  }
};

fetch(api, options)
  .then((res) => {
    return res.json();
  })
  .then((jsonData) => {
    getAllData(jsonData);
  })
  .catch((e) => {
    console.log(e);
  });
