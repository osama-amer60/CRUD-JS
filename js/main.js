var ProductNameInput = document.getElementById("ProductName");
var ProductCountInput = document.getElementById("ProductCount");
var ProductPriceInput = document.getElementById("ProductPrice");
var ProductCategoryInput = document.getElementById("ProductCategory");
var ProductDesInput = document.getElementById("ProductDes");
var mainBtn = document.getElementById("mainButton");
let warningMsg = document.getElementById("warningMsg");
var productContainer;
var getIndex;

if (localStorage.getItem("products") == null) {
  productContainer = [];
} else {
  productContainer = JSON.parse(localStorage.getItem("products"));
  displayProduct(productContainer);
}

//...................................................................
// addProduct Function
function addProduct() {
  if (
    ProductNameInput.value == "" ||
    ProductCountInput.value == "" ||
    ProductPriceInput.value == "" ||
    ProductCategoryInput.value == "" ||
    ProductDesInput.value == ""
  ) {
    warningMsg.classList.remove("d-none");
    removeWarningMsg()
  }else if(validateProductName()) {
    if (mainBtn.innerHTML == "Add Product") {
      var product = {
        name: ProductNameInput.value,
        count: ProductCountInput.value,
        price: ProductPriceInput.value,
        category: ProductCategoryInput.value,
        describtion: ProductDesInput.value,
      };
      productContainer.push(product);
      localStorage.setItem("products", JSON.stringify(productContainer));
      displayProduct(productContainer);
      clearForm();
    } else {
      productContainer[getIndex].name = ProductNameInput.value;
      productContainer[getIndex].count = ProductCountInput.value;
      productContainer[getIndex].price = ProductPriceInput.value;
      productContainer[getIndex].category = ProductCategoryInput.value;
      productContainer[getIndex].describtion = ProductDesInput.value;
      localStorage.setItem("products", JSON.stringify(productContainer));
      displayProduct(productContainer);
      clearForm();
      mainBtn.innerHTML = "Add Product";
    }
  } else {
    warningMsg.innerHTML = "*please start the product's name with capital letter"
    warningMsg.classList.remove("d-none");
    removeWarningMsg()
  }
}

function removeWarningMsg(){
  setTimeout(() => {
    warningMsg.classList.add("d-none");

  }, 3000);
}
//.....................................................................
// displayProduct Function
function displayProduct(prodcutList) {
  var details = ``;
  for (var i = 0; i < prodcutList.length; i++) {
    details += `<tr>
        <td>${i}</td>
        <td>${prodcutList[i].name}</td>
        <td>${prodcutList[i].count}</td>
        <td>${prodcutList[i].price}</td>
        <td>${prodcutList[i].category}</td>
        <td>${prodcutList[i].describtion}</td>
        <td><i id="increase" onclick="updateCount(${i},1)" class="fa fa-plus-circle fa-xl" aria-hidden="true" ></i></td>
        <td><i id="decrease" onclick="updateCount(${i},-1)" class="fa fa-minus-circle fa-xl" aria-hidden="true"></i></td>

        <td><button onclick="getIndex =  updateProduct(${i})" class="btn btn-warning"> update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger"> delete</button></td>
      </tr>  
      `;
  }
  document.getElementById("tableRow").innerHTML = details;
}

//.....................................................................
// clearForm Function
function clearForm() {
  ProductNameInput.value = "";
  ProductCountInput.value = "";
  ProductPriceInput.value = "";
  ProductCategoryInput.value = "";
  ProductDesInput.value = "";
}

//.....................................................................
// deleteProduct Function
function deleteProduct(productIndex) {
  productContainer.splice(productIndex, 1);
  localStorage.setItem("products", JSON.stringify(productContainer));
  displayProduct(productContainer);
}

//.....................................................................
// search Function
function searchProducts(term) {
  var searchProducts = [];
  for (var i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].name.toLowerCase().includes(term.toLowerCase()) ==
      true
    ) {
      searchProducts.push(productContainer[i]);
    }
  }
  displayProduct(searchProducts);
}

//.....................................................................
// Update Function
function updateProduct(index) {
  ProductNameInput.value = productContainer[index].name;
  ProductCountInput.value = productContainer[index].count;
  ProductPriceInput.value = productContainer[index].price;
  ProductCategoryInput.value = productContainer[index].category;
  ProductDesInput.value = productContainer[index].describtion;
  mainBtn.innerHTML = "Update Product";
  var x = index;
  return x;
}

//..........................................................
// valadation Function

function validateProductName() {
  var regex = /^[A-Z][a-z]{3,8}$/;

  if (regex.test(ProductNameInput.value)) {
    return true;
  } else {
    return false;
  }
}

//.............................................
//update count Function
function updateCount(index, num) {
  if (productContainer[index].count == 0 && num == -1) {
    productContainer[index].count == 0;
  } else {
    productContainer[index].count =
      Number(productContainer[index].count) + Number(num);
    localStorage.setItem("products", JSON.stringify(productContainer));
    displayProduct(productContainer);
  }
}

//Done
