let siteName = document.querySelector("#siteName");

let siteUrl = document.querySelector("#siteUrl");
let formControlo = document.querySelector("form");
let btnSubmit = document.querySelector("#btnSubmit");
let bookList = [];
if (localStorage.getItem("bookList")) {
  bookList = JSON.parse(localStorage.getItem("bookList"));
  display(bookList);
}
/*             B T N     C O N T R O L          */
function addBook() {
  book = {
    name: siteName.value,
    bookUrl: siteUrl.value,
  };
  if (!validateUrl(book.bookUrl) || !validateName(book.name)) {
    invalidInput();
    return;
  }
  siteName.classList.add("border-danger");
  bookList.push(book);
  localStorage.setItem("bookList", JSON.stringify(bookList));
  display(bookList);
  clearForm();
}
function deleteBook(index) {
  bookList.splice(index, 1);
  localStorage.setItem("bookList", JSON.stringify(bookList));
  display(bookList);
}

function display(list) {
  let cartona = ``;
  for (let i = 0; i < list.length; i++) {
    cartona += `
      <div class="w-100 webwell my-5 p-3 pb-5 d-flex justify-content-between">
                <h4>${bookList[i].name}</h4>
                <div class="w-50">
                    <a href="${bookList[i].bookUrl}" target="_blank"><button class="btn btn-primary me-3">Visit</button></a>
                    <button class="btn btn-danger" onclick="deleteBook(${i})">Delete</button>
                </div>
            </div>
    `;
  }
  document.querySelector("#display").innerHTML = cartona;
}

btnSubmit.addEventListener("click", (e) => {
  addBook();
  e.preventDefault();
});
/*             C L E A R       F O R M       */
function clearForm() {
  siteName.value = "";
  bookUrl.value = "";
}
/*               V A L I D A T  I O N             */
function validateName(bookName) {
  for (let i = 0; i < bookList.length; i++) {
    if (bookName == bookList[i].name) {
      return false;
    }
  }
  let regex = /[A-Z]/;
  return regex.test(bookName);
}
function validateUrl(bookUrl) {
  let regex = /.com$/;
  return regex.test(bookUrl);
}
function invalidInput() {
  siteName.classList.add("border-danger");
  siteUrl.classList.add("border-danger");
  let p = document.querySelectorAll("p");
  for (let i = 0; i < p.length; i++) {
    p[i].classList.remove("visually-hidden");
  }
}
