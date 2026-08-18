/**
 * NutriPlan - Main Entry Point
 * This is the main entry point for the application.
 * Import your modules and initialize the app here.
 */
//=========================================================================>
//=====( Meals )=======>
//=====================>
//== Decleration ================>
let baseUrl = "https://nutriplan-api.vercel.app/api";
let searchInput = document.getElementById("searchInput");
let areasGrid = document.getElementById("areasGrid");
let recipesCount = document.getElementById("recipesCount");
let categoriesGrid = document.getElementById("categoriesGrid");
let categoryCard = document.querySelectorAll(".category-card h3");
let recipesGrid = document.getElementById("recipesGrid");
let gridViewBtn = document.getElementById("gridViewBtn");
let listViewBtn = document.getElementById("listViewBtn");
let mainContent = document.getElementById("mainContent");
let navLinks = document.querySelectorAll(".nav-link");
let sections = [
  document.getElementById("mainContent"),
  document.getElementById("productsSection"),
  document.getElementById("foodlogSection"),
];
let mealDetails = document.getElementById("mealDetails");
let backToMealsBtn = document.getElementById("back-to-meals-btn");
//=========================================================================>
//== APIs ========>
//== function to Get Meals ================>
getMeals("chicken");
async function getMeals(searchTerm) {
  try {
    const res = await fetch(
      `${baseUrl}/meals/search?q=${searchTerm}&page=1&limit=25`,
    );
    //= Declration ==>
    let final = await res.json();
    // console.log(final.results);
    //= calling ==>
    displayMeals(final.results);
    displayMealDetails(final.results);
  } catch (error) {
    console.log(error);
  }
}
//=========================================================================>
//== function to Get Categories ================>
getCategories();
async function getCategories(searchTerm) {
  try {
    const res = await fetch(`${baseUrl}/meals/categories`);
    //= Declration ==>
    let final = await res.json();
    // console.log(final.results);
    //= calling ==>
    displayCategories(final.results.slice(0, 12));
  } catch (error) {
    console.log(error);
  }
}
//=========================================================================>
//== Shuffle function ================>
function shuffleArray(arr) {
  let shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    let random = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[random]] = [shuffled[random], shuffled[i]];
  }
  return shuffled;
}
//== function to Get Areas ================>
getAreas();
async function getAreas(searchTerm) {
  try {
    const res = await fetch(`${baseUrl}/meals/areas`);
    //= Declration ==>
    let final = await res.json();
    // console.log(final.results);
    //= calling ==>
    let randomAreas = shuffleArray(final.results).slice(0, 10);
    displayAreas(randomAreas);
  } catch (error) {
    console.log(error);
  }
}
//== function to Get Meals by Category ================>
async function getMealsByCategory(category) {
  try {
    const res = await fetch(
      `${baseUrl}/meals/filter?category=${category}&page=1&limit=25`,
    );
    //= Declration ==>
    let final = await res.json();
    let totalCount = final.pagination.total;
    //= calling ==>
    displayMeals(final.results);
    displayrecipesCount(totalCount);
  } catch (error) {
    console.log(error);
  }
}
//== function to Get Meals by Area ================>
async function getMealsByArea(area) {
  try {
    const res = await fetch(
      `${baseUrl}/meals/filter?area=${area}&page=1&limit=25`,
    );
    //= Declration ==>
    let final = await res.json();
    let totalCount = final.pagination.total;
    //= calling ==>
    displayMeals(final.results);
    displayrecipesCount(totalCount);
  } catch (error) {
    console.log(error);
  }
}
//=========================================================================>
//======= App =========>
//=====================>
//=== Display Recipes Count function ======>
function displayrecipesCount(totalCount) {
  recipesCount.innerHTML = `Showing ${totalCount} recipes`;
}
//=========================================================================>
//=== Display Meals function ======>
function displayMeals(arr) {
  let box = "";
  if (arr.length === 0) {
    box += `<div class=" flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No recipes found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
</div>`;
  } else {
    for (let i = 0; i < arr.length; i++) {
      box += `<div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="${arr[i].id}"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${arr[i].thumbnail}"
                  alt="Teriyaki Chicken Casserole"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${arr[i].category}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                  ${arr[i].area}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${arr[i].name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${arr[i].instructions}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${arr[i].category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${arr[i].area}
                  </span>
                </div>
              </div>
            </div>`;
    }
  }
  recipesGrid.innerHTML = box;
}
//=========================================================================>
//=== Display Categories function ======>
function displayCategories(arr) {
  let box = "";
  for (let i = 0; i < arr.length; i++) {
    box += `<div
              class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
              data-category="${arr[i].name}"
            >
              <div class="flex items-center gap-2.5"><div
                  class="text-white w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
                >
                  <i class="fa-solid fa-utensils"></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-900 ">${arr[i].name}</h3>
                </div>
              </div>
            </div>`;
  }
  categoriesGrid.innerHTML = box;
}
//=========================================================================>
//=== Display area function ======>
function displayAreas(arr) {
  let box = `<button
                class="area-btn active px-4 py-2 bg-emerald-600 text-white rounded-full font-medium text-sm whitespace-nowrap hover:bg-emerald-700 transition-all"
                data-area=""
              >
                All Areas
              </button>`;
  for (let i = 0; i < arr.length; i++) {
    box += `<button
              class=" area-btn px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all" data-area="${arr[i].name}"
            >
              ${arr[i].name}
            </button>`;
  }
  areasGrid.innerHTML = box;
}
//=========================================================================>
//=== search Input =======>
searchInput.addEventListener("input", () => {
  let searchTerm = searchInput.value;
  getMeals(searchTerm);
});
//=======================>
//== Category Cards =====>
categoriesGrid.addEventListener("click", (e) => {
  let card = e.target.closest(".category-card");
  let category = card.querySelector("h3").textContent.trim();
  getMealsByCategory(category);
});
//======================>
//= Area Buttons =======>
areasGrid.addEventListener("click", (e) => {
  let areaBtn = e.target.closest(".area-btn");
  //= Active Buttons =====>
  document.querySelectorAll(".area-btn").forEach((btn) => {
    btn.classList.remove("bg-emerald-600", "text-white");
    btn.classList.add("bg-gray-100", "text-gray-700");
  });
  areaBtn.classList.remove("bg-gray-100", "text-gray-700");
  areaBtn.classList.add("bg-emerald-600", "text-white");
  //======================>
  let area = areaBtn.dataset.area;
  if (area === "") {
    getMeals("chicken");
  } else {
    getMealsByArea(area);
  }
});
//=========================================================================>
//= View Buttons =======>
function changeView(view) {
  let isGrid;
  if (view === "grid-cols-4") {
    isGrid = true;
  } else {
    isGrid = false;
  }
  recipesGrid.classList.toggle("grid-cols-4", isGrid);
  recipesGrid.classList.toggle("grid-cols-2", !isGrid);

  if (isGrid) {
    gridViewBtn.classList.add("bg-white", "rounded-md", "shadow-sm");
    listViewBtn.classList.remove("bg-white", "rounded-md", "shadow-sm");
  } else {
    listViewBtn.classList.add("bg-white", "rounded-md", "shadow-sm");
    gridViewBtn.classList.remove("bg-white", "rounded-md", "shadow-sm");
  }
}
gridViewBtn.addEventListener("click", () => changeView("grid-cols-4"));
listViewBtn.addEventListener("click", () => changeView("grid-cols-2"));
//=========================================================================>
//= View Pages =======>
const activeClasses = ["bg-emerald-50", "text-emerald-700", "font-semibold"];
const inactiveClasses = ["text-gray-600", "hover:bg-gray-50", "font-medium"];

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    //== hide all sections ====>
    if (mealDetails) {
      mealDetails.classList.add("hidden");
    }
    sections.forEach((section) => section.classList.add("hidden"));
    //== showing sections witch active ====>
    let targetId = link.getAttribute("href").substring(1);
    let targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.remove("hidden");
    }
    //== decorate active button ====>
    navLinks.forEach((item) => {
      item.classList.remove(...activeClasses);
      item.classList.add(...inactiveClasses);
      //== decorate active span ====>
      let span = item.querySelector("span");
      if (span) {
        span.classList.remove("font-semibold");
        span.classList.add("font-medium");
      }
    });

    link.classList.remove(...inactiveClasses);
    link.classList.add(...activeClasses);

    let activeSpan = link.querySelector("span");
    if (activeSpan) {
      activeSpan.classList.remove("font-medium");
      activeSpan.classList.add("font-semibold");
    }
  });
});
//====================================================>
document.addEventListener("click", function (e) {
  let mealCard = e.target.closest(".recipe-card");
  if (mealCard) {
    let mealId = mealCard.getAttribute("data-meal-id");
  }
  if (mealCard) {
    mainContent.classList.add("hidden");
    mealDetails.classList.remove("hidden");
  }
});
if (backToMealsBtn) {
  backToMealsBtn.addEventListener("click", function () {
    mealDetails.classList.add("hidden");
    mainContent.classList.remove("hidden");
  });
}
//=========================================================================>
//====( Products )=====>
//=====================>
//== Decleration product variable =========>
let productSearchInput = document.getElementById("productSearchInput");
let searchProductBtn = document.getElementById("searchProductBtn");
let lookupBarcodeBtn = document.getElementById("lookup-barcode-btn")
let productsGrid = document.getElementById("products-grid");
let barcodeInput=document.getElementById("barcode-input") 
//=========================================================================>
//== APIs ========>
//== function to Get Products ================>
getProducts("pepsi");
async function getProducts(productTerm) {
  try {
    const res = await fetch(
      `${baseUrl}/products/search?q=${productTerm}&page=1&limit=24`,
    );
    //= Declration ==>
    let final = await res.json();
    console.log(final.results);
    //= calling ==>
    displayProducts(final.results);
    // displayMealDetails(final.results)
  } catch (error) {
    console.log(error);
  }
}
//== function to Get Products by barcode ================>
getProductsByBarcode();
async function getProductsByBarcode(barcodeTerm) {
  try {
    const res = await fetch(
      `/products/barcode/${barcodeTerm}`,
    );
    //= Declration ==>
    let final = await res.json();
    console.log(final.results);
    //= calling ==>
    displayProducts(final.results);
    // displayMealDetails(final.results)
  } catch (error) {
    console.log(error);
  }
}
//=========================================================================>
//======= App =========>
//=====================>
//== function to display Products ================>
function displayProducts(arr) {
  let box = "";
  if (arr.length === 0) {
    box += `<div class=" flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No recipes found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
</div>`;
  } else {
  for (let i = 0; i < arr.length; i++) {
    box += `<div
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="${arr[i].barcode}"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${arr[i].image}"
                    alt="Product Name"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div
                    class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                   Nutri-Score ${arr[i].nutritionGrade}
                    
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA 2"
                  >
                                      ${arr[i].novaGroup}

                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                  ${arr[i].brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                  ${arr[i].name}

                  </h3>

                  <div
                    class="flex items-center gap-3 text-xs text-gray-500 mb-3"
                  >
                    <span
                      ><i class="fa-solid fa-weight-scale mr-1"></i>250g</span
                    >
                    <span
                      ><i class="fa-solid fa-fire mr-1"></i>${arr[i].nutrients.calories} kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${arr[i].nutrients.protein.toFixed(2)}g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${arr[i].nutrients.carbs.toFixed(2)}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${arr[i].nutrients.fat.toFixed(2)}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${arr[i].nutrients.sugar.toFixed(2)}g</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>`;
  }}
  productsGrid.innerHTML=box;
}
//== function to search Products ================>
searchProductBtn.addEventListener("click", () => {
  let productTerm = productSearchInput.value;
  getProducts(productTerm);
});
//== function to search Products by barcode ================>
lookupBarcodeBtn.addEventListener("click", () => {
  let barcodeTerm = barcodeInput.value;
  getProductsByBarcode(barcodeTerm);
  getProducts(barcodeTerm)
});