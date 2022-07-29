class RecipeRepository {
  constructor(recipes) {
    this.recipes = recipes
  }

  filterByTags(tags, recipes) {
    if(tags.length === 0) {
      return this.recipes
    }
    const filteredRecipes = []
    recipes.forEach(recipe => {
      tags.forEach(tag => {
        if(recipe.tags.includes(tag) && !filteredRecipes.includes(recipe)) {
          filteredRecipes.push(recipe)
        }
      })
    })
    return filteredRecipes
  }

  filterNames(name) {
    let filteredByName = this.recipes.filter(recipe => {
      if (recipe.name.toLowerCase().includes(name.toLowerCase())) {
        return recipe
      }
    })
      return filteredByName
  }
}

export default RecipeRepository;
