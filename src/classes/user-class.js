// import RecipeRepository from './RecipeRepository';

class User {
    constructor(users) {
        this.name = users.name
        this.id = users.id
        this.pantry = users.pantry
        this.recipesToCook = []
    }

    addRecipeToCook(recipe) {
      this.recipesToCook.push(recipe)
    }

    removeRecipeToCook(recipe) {
      let index = this.recipesToCook.indexOf(recipe)
        this.recipesToCook.splice(index, 1)
    }

    userFilterTags(tag) {
      return this.recipesToCook.filter(recipe => {
        if (recipe.tags.includes(tag)) {
          return recipe
        }
      })
    }

    userFilterNames(name) {
      return this.recipesToCook.filter(recipe => {
        if (recipe.name.toLowerCase().includes(name.toLowerCase())) {
          return recipe
        }
      })
     }

      checkPantry(recipe) {
        let reduced = recipe.ingredients.reduce((list, ingredient) => {
          this.pantry.forEach(element => {
            if (element.ingredient === ingredient.id) {
              let name
              recipe.ingData.forEach(ing => {
                if (element.ingredient === ing.id) {
                  name = ing.name
                }
              })
              if (element.amount >= ingredient.quantity.amount) {
                list.push(`- You have enough ${name}.`)
              } else {
                if (ingredient.quantity.amount % 1 === 0) {
                list.push(`* You need ${(ingredient.quantity.amount - element.amount)} ${ingredient.quantity.unit} ${name}.`)
              } else {
                list.push(`* You need ${(ingredient.quantity.amount - element.amount).toFixed(2)} ${ingredient.quantity.unit} ${name}.`)
              }
              }
            }
          })
          return list
        }, [])
        let recipeIngIds = recipe.ingredients.reduce((list, ingredient) => {
          list.push(ingredient.id)
          return list
        }, [])
        let pantryIngIds = this.pantry.reduce((list, ingredient) => {
          list.push(ingredient.ingredient)
          return list
        }, [])

        function getIngredientsNeeded() {
          let needed = []
          recipeIngIds.forEach(id => {
            if (!pantryIngIds.includes(id)) {
              recipe.ingData.find(ingred => {
                if (ingred.id === id) {
                  needed.push(ingred.name)
                }
              })
            }
          })
          let amount
          let units
          let thing = needed.map(ing => {
            recipe.ingData.forEach(ingred => {
              if (ingred.name === ing) {
                recipe.ingredients.forEach(element => {
                  if (ingred.id === element.id) {
                    if (element.quantity.amount % 1 === 0) {
                    amount = element.quantity.amount
                  } else {
                    amount = element.quantity.amount.toFixed(2)
                  }
                    units = element.quantity.unit
                  }
                })
              }
            })
            return `* You need ${amount} ${units} ${ing}.`
          })
          return thing
        }
        return reduced.concat(getIngredientsNeeded()).sort().join('\n')
    }
   }





export default User
