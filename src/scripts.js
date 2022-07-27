import './styles.css';
import apiCalls from './apiCalls';
import './images/heart.png'
import './images/filled-heart.png'
import './images/trash.png'

import Glide from '@glidejs/glide'
import "/node_modules/@glidejs/glide/dist/css/glide.core.min.css"
import "/node_modules/@glidejs/glide/dist/css/glide.theme.min.css"

import RecipeRepository from './classes/RecipeRepository.js'
import Recipe from './classes/recipe'
import User from './classes/user-class'

const config = {
    type:'carousel',
    startAt: 0,
    perView: 2
}

new Glide('.glide', config).mount()

let recipeData
let recipeRepository
let usersData
let ingredientsData
let newUser

const viewAllButton = document.querySelector('#viewAllButton')
const homePageView = document.querySelector('.home-page-view')
const viewAllPage = document.querySelector('.view-all-page')
const homeButton = document.querySelector('#homeButton')
const favoritesButton = document.querySelector('#favoritesButton')
const recipeDetailsPage = document.querySelector('.recipe-details-page')
const allRecipesContainer = document.querySelector('.all-recipes')
const recipeDetailImage = document.querySelector('#recipeDetail')
const featuredTitle = document.querySelector('#featuredTitle')
const recipeDetailTitle = document.querySelector('h2')
const mainHeader = document.querySelector('h1')
const recipeInstructions = document.querySelector('.details')
const ingredientNames = document.querySelector('.ingredient-list-names')
const totalCost = document.querySelector('.total-cost')
const tagContainer = document.querySelector('.tag-container')
const tagContainer2 = document.querySelector('.tag-container2')
const searchbar = document.querySelector("#searchbar")
const favoriteSearchBar = document.querySelector("#searchbar2")
const searchButton = document.querySelector(".search-button")
const searchButton2 = document.querySelector('.search-button2')
const favoriteRecipesPage = document.querySelector('.favorite-recipes')
const favoritePageContainer = document.querySelector('.favorite-recipe-icons')
const pantryContainer = document.querySelector('.pantry-ingredient-container')
const cookButton = document.querySelector('#cookButton')
const canYouCook = document.querySelector('.can-you-cook')
const pantryPage = document.querySelector('.pantry-page')
const pantryButton = document.querySelector('#pantryButton')

window.addEventListener('click', function(event) {
  filterByTag(event)
  favoriteFilterByTag(event)
})
window.addEventListener('load', function(event) {
  showHomePage()
  fetchUsers()
  fetchRecipes()
  fetchIngredients()
})
allRecipesContainer.addEventListener('click', function(event) {
  showRecipeDetailsPage(event)
})
favoritePageContainer.addEventListener('click', function(event) {
  showRecipeDetailsPage(event)
  hide(favoriteRecipesPage)
})
viewAllPage.childNodes[3].addEventListener('click', function(event) {
  changeHearts(event)
})
favoriteRecipesPage.childNodes[3].addEventListener('click', function(event) {
  deleteRecipe(event)
})
viewAllButton.addEventListener('click', showViewAllPage)
homeButton.addEventListener('click', showHomePage)
favoritesButton.addEventListener('click', showFavoritesPage)
searchButton.addEventListener('click', filterByName)
searchButton2.addEventListener('click', favoriteFilterByName)
cookButton.addEventListener('click', cook)
pantryButton.addEventListener('click', showPantryPage)

function fetchRecipes() {
  fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes")
  .then(response => response.json())
  .then(data => {
  recipeData = data.recipeData
  recipeRepository = new RecipeRepository(recipeData)
  })
}

function fetchUsers() {
  fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users")
  .then(response => response.json())
  .then(data => {
  usersData = data.usersData
  let newUserData = usersData[Math.floor(Math.random() * usersData.length)]
  newUser = new User(newUserData)
  //console.log('newUser', newUser)
  })
}

function fetchIngredients() {
  fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients")
  .then(response => response.json())
  .then(data =>{
    ingredientsData = data.ingredientsData
    //console.log(ingredientsData)
  })
}

function showViewAllPage() {
  hide(homePageView)
  show(viewAllPage)
  hide(recipeDetailsPage)
  show(homeButton)
  hide(viewAllButton)
  hide(favoriteRecipesPage)
  show(favoritesButton)
  hide(featuredTitle)
  show(pantryButton)
  createTags(tagContainer)
  populateAllRecipes()
  changeHeader()
}

function showHomePage() {
  show(homePageView)
  hide(viewAllPage)
  hide(recipeDetailsPage)
  hide(homeButton)
  show(viewAllButton)
  show(favoritesButton)
  hide(favoriteRecipesPage)
  show(featuredTitle)
  show(pantryButton)
  changeHeader()
}

function showFavoritesPage() {
  hide(homePageView)
  hide(viewAllPage)
  hide(recipeDetailsPage)
  show(favoriteRecipesPage)
  show(viewAllButton)
  hide(favoritesButton)
  hide(featuredTitle)
  createTags(tagContainer2)
  changeHeader()
  populateFavoriteRecipes()
  show(pantryButton)
}

function showRecipeDetailsPage(event) {
  if (event.target.classList.contains('view-all-recipe-image')){
    hide(featuredTitle)
    hide(homePageView)
    hide(viewAllPage)
    show(recipeDetailsPage)
    show(viewAllButton)
    show(pantryButton)
    populateRecipeDetails(event)
  }
    changeHeader()
}

function showPantryPage() {
  hide(homePageView)
  hide(viewAllPage)
  hide(recipeDetailsPage)
  hide(favoriteRecipesPage)
  show(viewAllButton)
  show(favoritesButton)
  hide(featuredTitle)
  show(pantryPage)
  hide(pantryButton)
  userPantryIngredients()
  mainHeader.innerText = `${newUser.name}'s Pantry`
}

function populateRecipeDetails(event) {
  const getTitle = recipeData.filter(recipe => event.target.src === recipe.image)
  let recipe = new Recipe(getTitle[0], ingredientsData)
  recipeDetailImage.src = `${event.target.src}`
  recipeDetailTitle.innerText = `${getTitle[0].name}`
  let directions = recipe.listDirections()
  recipeInstructions.innerText = `${directions}`
  ingredientNames.innerText = `${recipe.determineIngredientNames()}`
  totalCost.innerText = `${recipe.determineCostOfAllIngredients()}`
  cook(recipe)
}

function changeHearts(event) {
  if (event.target.classList.contains('add-to-favorites-icon')){
    event.target.src = "./images/filled-heart.png"
    event.target.classList = 'unfavorite'
    recipeRepository.recipes.forEach(recipe => {
      if (recipe.image === event.target.parentNode.childNodes[1].src) {
        newUser.addRecipeToCook(recipe)
        }
      })
  } else if (event.target.classList.contains('unfavorite') || event.target.classList.contains('trash-icon')) {
    event.target.src = "./images/heart.png"
    event.target.classList = 'add-to-favorites-icon'
    recipeRepository.recipes.forEach(recipe => {
      if (recipe.image === event.target.parentNode.childNodes[1].src) {
        newUser.removeRecipeToCook(recipe)
      }
    })
  }
}

function deleteRecipe(event) {
  if (event.target.classList.contains('trash-icon')) {
    recipeRepository.recipes.forEach(recipe => {
    if (recipe.image === event.target.parentNode.childNodes[1].src) {
    newUser.removeRecipeToCook(recipe)
    showFavoritesPage()
      }
    })
  }
}

function populateAllRecipes() {
  viewAllPage.childNodes[3].innerHTML = ""
  recipeData.forEach(recipe => {
    if (!newUser.recipesToCook.includes(recipe)) {
      heartHandler(recipe)
    } else {
      filledHeartHandler(recipe)
    }
  })
}

function populateFavoriteRecipes() {
  favoritePageContainer.innerHTML = ''
  newUser.recipesToCook.forEach(recipe => {
    favoritePageContainer.innerHTML +=
      `<section class="recipe-icon">
        <img class="view-all-recipe-image" src="${recipe.image}" alt="random-recipe-image">
        <img class="trash-icon" src="./images/trash.png">
        <p>${recipe.name.toUpperCase()}</p>
      </section>`
    })
}

function heartHandler(recipe) {
  viewAllPage.childNodes[3].innerHTML +=
    `<section class="recipe-icon">
      <img class="view-all-recipe-image" src="${recipe.image}" alt="random-recipe-image">
      <img class="add-to-favorites-icon" src='./images/heart.png'>
      <p>${recipe.name.toUpperCase()}</p>
    </section>`
}

function filledHeartHandler(recipe) {
  viewAllPage.childNodes[3].innerHTML +=
    `<section class="recipe-icon">
      <img class="view-all-recipe-image" src="${recipe.image}" alt="random-recipe-image">
      <img class="unfavorite" src='./images/filled-heart.png'>
      <p>${recipe.name.toUpperCase()}</p>
    </section>`
}

function createTags(tagContainer) {
  const getRecipeTags = recipeData.map(recipe => recipe.tags).flat()
  const uniqueTags = getRecipeTags.filter((recipe, index)=> {
    return getRecipeTags.indexOf(recipe) === index;
  })
  tagContainer.innerHTML = ''
  uniqueTags.forEach(tag => {
    tagContainer.innerHTML += `<input type="checkbox" id="${tag}" unchecked>
      <label for="${tag}">${tag}</label><br>`
  })
}

function filterByTag(event) {
  if (event.target.type === "checkbox") {
    let filteredRecipesByTag = recipeRepository.filterTags(event.target.id)
      viewAllPage.childNodes[3].innerHTML = ""
      filteredRecipesByTag.forEach(recipe => {
        viewAllPage.childNodes[3].innerHTML +=
        `<section class="recipe-icon">
          <img class="view-all-recipe-image" src="${recipe.image}" alt="random-recipe-image">
          <img class="add-to-favorites-icon" src="./images/heart.png">
          <p>${recipe.name.toUpperCase()}</p>
        </section>`
    })
  }
}

function favoriteFilterByTag(event) {
  if (event.target.type === "checkbox") {
    let filteredRecipesByTag = newUser.userFilterTags(event.target.id)
      favoriteRecipesPage.childNodes[3].innerHTML = ''
      filteredRecipesByTag.forEach(recipe => {
        favoriteRecipesPage.childNodes[3].innerHTML +=
          `<section class="recipe-icon">
            <img class="view-all-recipe-image" src="${recipe.image}" alt="random-recipe-image">
            <img class='trash-icon' src="./images/trash.png">
            <p>${recipe.name.toUpperCase()}</p>
          </section>`
    })
  }
}


function filterByName(event) {
  event.preventDefault()
  let filteredRecipesByName = recipeRepository.filterNames(searchbar.value)
  viewAllPage.childNodes[3].innerHTML = ""
  filteredRecipesByName.forEach(recipe => {
    viewAllPage.childNodes[3].innerHTML +=
      `<section class="recipe-icon">
        <img class="view-all-recipe-image" src="${recipe.image}" alt="random-recipe-image">
        <img class="add-to-favorites-icon" src="./images/heart.png">
        <p>${recipe.name.toUpperCase()}</p>
      </section>`
  })
}

function favoriteFilterByName(event) {
  event.preventDefault()
  let filteredRecipesByName = newUser.userFilterNames(favoriteSearchBar.value)
  favoriteRecipesPage.childNodes[3].innerHTML = ''
  filteredRecipesByName.forEach(recipe => {
    favoriteRecipesPage.childNodes[3].innerHTML +=
      `<section class="recipe-icon">
        <img class="view-all-recipe-image" src="${recipe.image}" alt="random-recipe-image">
        <img class='trash-icon' src="./images/trash.png">
        <p>${recipe.name.toUpperCase()}</p>
      </section>`
  })
}

function userPantryIngredients() {
  pantryContainer.innerHTML = ''
  let ingredientUnit;
  const userPantryIngs = newUser.pantry.map(pantryIngredient => {
    ingredientsData.forEach(ingredient => {
      if(ingredient.id === pantryIngredient.ingredient) {
        recipeData.forEach(recipe => {
          recipe.ingredients.find(element => {
            if(ingredient.id === element.id) {
              ingredientUnit = element.quantity.unit
            }
          })
          })
        pantryContainer.innerHTML += `<input class="pantry-list "type="number" id="${pantryIngredient.ingredient}" value="${pantryIngredient.amount}">
    <label for="${ingredient.name}">${ingredientUnit} ${ingredient.name}</label><br>`
    //console.log('ing name', ingredient)
      }
    })
    //want label to be ingredient name
  })
  //console.log('pantryings', userPantryIngs)
  return userPantryIngs
}

function cook(recipe) {
  if (newUser.checkPantry(recipe).includes("You need")) {
    hide(cookButton)
    canYouCook.innerText = `Sorry! You cannot cook this recipe. ${'\n'}
    ${newUser.checkPantry(recipe)}`
  } else {
    show(cookButton)
    canYouCook.innerText = `Enjoy your meal! `
  }

}

function changeHeader() {
  if (!favoriteRecipesPage.classList.contains('hidden')) {
    mainHeader.innerText = `${newUser.name}'s Favorites`
  } else {
    mainHeader.innerText = "What's Cookin?"
  }
}

function show(element) {
  element.classList.remove('hidden')
}

function hide(element) {
  element.classList.add('hidden')
}
