const ListMainEl = document.getElementById("itemsContainer");
let inputSearchEl = document.getElementById("inputSearch");
let gridIconsEl = document.getElementById("gridIcons");
let listIconsEl = document.getElementById("listIcons");

// comment

gridIconsEl.addEventListener("click", () => {
  ListMainEl.classList.add("listContainer");
});

listIconsEl.addEventListener("click", (e) => {
  ListMainEl.classList.remove("listContainer");
});

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
  productImg.classList = "img";
  productImg.src = data.product_image
    ? "https://i2.wp.com/asvs.in/wp-content/uploads/2017/08/dummy.png?zoom=1.5&fit=399%2C275&ssl=1"
    : data.product_image;
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
  }
};

let search = "";
function getvalue(e) {
  search = inputSearchEl.value;
  DataFun(search);
}

const getAllData = (filter) => {
  for (let i of filter) {
    CreateList(i);
  }
};

const DataFun = (search) => {
  fetch(api, options)
    .then((res) => {
      return res.json();
    })
    .then((jsonData) => {
      let filter = jsonData.data.filter((item) =>
        item.product_title.toLowerCase().includes(search)
      );
      console.log(filter);
      getAllData(filter);
    })
    .catch((e) => {
      console.error(e);
    });
};
DataFun(search);
