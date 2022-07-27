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
        return recipe.ingredients.reduce((list, ingredient) => {
          this.pantry.forEach(element => {
            if (element.ingredient === ingredient.id) {
              let name
              recipe.ingData.forEach(ing => {
                if (element.ingredient === ing.id) {
                  name = ing.name
                }
              })
            if (element.amount <= ingredient.quantity.amount) {
              list.push(`You have enough ${name}!`)
            } else {
              list.push(`You need ${element.amount - ingredient.quantity.amount} ${ingredient.quantity.unit} ${name}!`)
            }
          }
        })
  return list
}, [])
        // get names and amounts needed of ingredients in recipes that user both has and does not have in pantry
        //
        //
    //     return recipe.ingredients.reduce((list, ingredient) => {
    //       this.pantry.forEach(element => {
    //         let name
    //         recipe.ingData.forEach(ing => {
    //           if (ingredient.id === ing.id) {
    //             name = ing.name
    //           }
    //         if (element.ingredient === ingredient.id) {
    //            if (element.amount.toFixed(2) <= ingredient.quantity.amount.toFixed(2)) {
    //             list.push(`You need ${element.amount.toFixed(2) - ingredient.quantity.amount.toFixed(2)} ${ingredient.quantity.unit} ${name}!`)
    //           }
    //         } else {
    //           list.push(`You need ${ingredient.quantity.amount.toFixed(2)} ${ingredient.quantity.unit} ${name}!`)
    //         }
    //         }
    //     })
    //       return list
    //     }, []).join('\n')
    // }
   }
 }




export default User
