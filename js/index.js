// HTML VARIABLES
let rowCat = document.getElementById("rowCat");
let searchContainer = document.getElementById("searchContainer");
let fadeValue = 400;

// VARIABLES
let categoriesURL = "https://www.themealdb.com/api/json/v1/1/categories.php";
let areaURL = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
let ingredientsURL = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
let foodURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

let nameRegex = /^[a-zA-Z ]+$/;
let emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let mobileNoRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
let ageRegex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
let passwordRegex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
// FUNCTIONS

function openSideNav() {
  $(".side-nav").animate({ left: "0px" }, 500);
  $(".open-close").removeClass("fa-align-justify");
  $(".open-close").addClass("fa-x");
  $(".links li").animate({ bottom: "0px", right: "0px" }, 500);
}

function closeSideNav() {
  $(".side-nav").animate({ left: "-315px" }, 500);
  $(".open-close").removeClass("fa-x");
  $(".open-close").addClass("fa-align-justify");
  $(".links li").animate({ bottom: "-200px", right: "-100px" }, 500);
}
$(".open-close").on("click", function () {
  if ($(".side-nav").css("left") == "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});

async function getFood() {
  let response = await fetch(`${foodURL}`);
  let data = await response.json();

  displayFood(data.meals.slice(0, 20));
}

function displayFood(arr) {
  $(".loading-screen").fadeIn(fadeValue);
  $(".side-nav").animate({ left: "-315px" }, 500);
  let holder = "";
  for (let i = 0; i < arr.length; i++) {
    holder += `<div class="col-md-3">
            <div onclick="mealsDetails('${arr[i].idMeal}')" class="food-card position-relative rounded-2 bg-white  overflow-hidden">
              <img class="w-100" src="${arr[i].strMealThumb}" alt="Food-img" />

              <div
                class="food-layer d-flex align-items-center position-absolute p-2"
              >
                <h2>${arr[i].strMeal}</h2>
              </div>
            </div>
          </div>`;
  }
  $(".loading-screen").fadeOut(fadeValue);
  rowCat.innerHTML = holder;
}
getFood();
// Categories

async function getCategories() {
  let response = await fetch(`${categoriesURL}`);
  let data = await response.json();

  displyCategories(data.categories);
}
function displyCategories(arr) {
  $(".loading-screen").fadeIn(fadeValue);
  let holder = "";
  for (let i = 0; i < arr.length; i++) {
    holder += `<div class="col-md-3">
            <div onclick="getCategoriesMeals('${
              arr[i].strCategory
            }')" class="food-card position-relative rounded-2 bg-white  overflow-hidden">
              <img class="w-100" src="${
                arr[i].strCategoryThumb
              }" alt="Food-img" />

              <div
                class="food-layer text-center d-flex flex-column justify-content-center align-items-center position-absolute p-2"
              >
                <h2>${arr[i].strCategory}</h2>
                <p>${arr[i].strCategoryDescription
                  .split(" ")
                  .slice(0, 20)
                  .join(" ")}</p>
              </div>
            </div>
          </div>`;
  }
  $(".loading-screen").fadeOut(fadeValue);
  rowCat.innerHTML = holder;
}
$(".category").on("click", function () {
  getCategories();
  closeSideNav();
});

async function getCategoriesMeals(category) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  let data = await response.json();
  displayFood(data.meals.slice(0, 20));
}
// Area

async function getArea() {
  let response = await fetch(`${areaURL}`);
  let data = await response.json();

  displayArea(data.meals);
}

function displayArea(arr) {
  $(".loading-screen").fadeIn(fadeValue);
  let holder = "";
  for (let i = 0; i < arr.length; i++) {
    holder += `<div class="col-md-3">
            <div onclick="filterByArea('${arr[i].strArea}')" class="food-card position-relative rounded-2 text-white ">
              <i class="fa-solid fa-house-laptop fa-4x "></i>

              
                <h2>${arr[i].strArea}</h2>
           
            </div>
          </div>`;
  }
  $(".loading-screen").fadeOut(fadeValue);
  rowCat.innerHTML = holder;
}
async function filterByArea(area) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let data = await response.json();
  displayFood(data.meals);
}
$(".area").on("click", function () {
  getArea();
  closeSideNav();
});

// Ingredients
async function getIngredients() {
  let response = await fetch(`${ingredientsURL}`);
  let data = await response.json();
  displayIngredients(data.meals.slice(0, 20));
}
async function filterByMainIngredient(ingredient) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  let data = await response.json();
  displayFood(data.meals);
}
function displayIngredients(arr) {
  $(".loading-screen").fadeIn(fadeValue);
  let holder = "";

  for (let i = 0; i < arr.length; i++) {
    holder += `<div class="col-md-3">
            <div onclick="filterByMainIngredient('${
              arr[i].strIngredient
            }')" class="food-card position-relative rounded-2 text-white  text-center">
              <i class="fa-solid fa-drumstick-bite fa-4x "></i>
                <h2 class="text-white">${arr[i].strIngredient}</h2>
                <p> ${arr[i].strDescription
                  .split(" ")
                  .slice(0, 20)
                  .join(" ")}</p>
           
            </div>
          </div>`;
  }
  $(".loading-screen").fadeOut(fadeValue);
  rowCat.innerHTML = holder;
}
$(".ingredients").on("click", function () {
  getIngredients();
  closeSideNav();
});
// search
function displaySearch() {
  $(".loading-screen").fadeIn(fadeValue);
  searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input class="search-name form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input maxlength="1" class="search-letter form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`;
  $(".loading-screen").fadeOut(fadeValue);
  rowCat.innerHTML = "";
  $(".search-name").on("input", function (e) {
    $(".search-letter").value = "";
    searchByName(e.target.value);
  });
  $(".search-letter").on("input", function (e) {
    $(".search-name").value = "";
    searchByLetter(e.target.value);
  });
}
$(".search").on("click", function () {
  displaySearch();
  closeSideNav();
});

async function searchByName(name) {
  rowCat.innerHTML = "";
  if (name == "") {
    displayFood([]);
  }
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  let data = await response.json();

  if (data.meals !== null) {
    displayFood(data.meals);
  }
}
async function searchByLetter(letter) {
  rowCat.innerHTML = "";
  if (letter == "") {
    letter = "w";
  }
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  let data = await response.json();
  data.meals ? displayFood(data.meals) : displayFood([]);
}
// meals details
async function mealsDetails(mealId) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  let data = await response.json();
  displayMealsDetails(data.meals[0]);
}
function displayMealsDetails(meal) {
  $(".loading-screen").fadeIn(fadeValue);
  searchContainer.innerHTML = "";

  let recipes = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      recipes += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
      <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }
  let holder = `
  <div class="col-md-4">
              <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                  alt="">
                  <h2 class='text-white mt-3'>${meal.strMeal}</h2>
          </div>
          <div class="col-md-8 text-white">
              <h2>Instructions</h2>
              <p>${meal.strInstructions}</p>
              <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
              <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
              <h3>Recipes :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                  ${recipes}
              </ul>

              <h3>Tags :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                  ${tagsStr}
              </ul>

              <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
              <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
          </div>`;
  $(".loading-screen").fadeOut(fadeValue);
  rowCat.innerHTML = holder;
}
// contact

function showContacts() {
  $(".loading-screen").fadeIn(fadeValue);

  let holder = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput"  type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Can not be empty & Special characters and numbers not allowed 
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput"  type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput"  type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput"  type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput"  type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput"  type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `;
  $(".loading-screen").fadeOut(fadeValue);
  $(".cards-holder .container .row").html(`${holder} `);
  submitBtn = document.getElementById("submitBtn");
  document.getElementById("nameInput").addEventListener("focus", () => {
    nameCheck = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailCheck = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneCheck = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageCheck = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordCheck = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordCheck = true;
  });

  $("#nameInput").on("keyup", function () {
    inputsValidation();
  });
  $("#emailInput").on("keyup", function () {
    inputsValidation();
  });
  $("#phoneInput").on("keyup", function () {
    inputsValidation();
  });
  $("#ageInput").on("keyup", function () {
    inputsValidation();
  });
  $("#passwordInput").on("keyup", function () {
    inputsValidation();
  });
  $("#repasswordInput").on("keyup", function () {
    inputsValidation();
  });
}
$(".contact").on("click", function () {
  showContacts();
  closeSideNav();
});
let nameCheck = false;
let emailCheck = false;
let phoneCheck = false;
let ageCheck = false;
let passwordCheck = false;
let repasswordCheck = false;

function inputsValidation() {
  if (nameCheck) {
    if (nameValidate()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailCheck) {
    if (emailValidate()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (phoneCheck) {
    if (phoneValidate()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageCheck) {
    if (ageValidate()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordCheck) {
    if (passwordValidate()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswordCheck) {
    if (repasswordValidate()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidate() &&
    emailValidate() &&
    phoneValidate() &&
    ageValidate() &&
    passwordValidate() &&
    repasswordValidate()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}

function nameValidate() {
  return nameRegex.test(document.getElementById("nameInput").value);
}

function emailValidate() {
  return emailRegex.test(document.getElementById("emailInput").value);
}

function phoneValidate() {
  return mobileNoRegex.test(document.getElementById("phoneInput").value);
}

function ageValidate() {
  return ageRegex.test(document.getElementById("ageInput").value);
}

function passwordValidate() {
  return passwordRegex.test(document.getElementById("passwordInput").value);
}

function repasswordValidate() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}

// EVENTS
