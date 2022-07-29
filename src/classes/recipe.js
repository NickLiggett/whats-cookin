class Recipe {
    constructor(recipeData, ingDataSet) {
        this.id = recipeData.id
        this.image = recipeData.image
        this.ingredients = recipeData.ingredients
        this.instructions = recipeData.instructions
        this.name = recipeData.name
        this.tags = recipeData.tags
        this.ingData = ingDataSet
    }

    determineIngredientNames() {
        return this.ingredients.reduce((list, ingredient) => {
            this.ingData.forEach(element => {
                if (element.id === ingredient.id) {
                    if (ingredient.quantity.amount % 1 === 0) {
                        list.push(`${element.name}: ${ingredient.quantity.amount} ${ingredient.quantity.unit}`)
                    } else {
                        list.push(`${element.name}: ${ingredient.quantity.amount.toFixed(2)} ${ingredient.quantity.unit}`)
                    }
                }
            })
            return list
        }, []).join('\n')
    }

    determineCostOfAllIngredients() {
      const total = this.ingredients.reduce((sum, ingredient) => {
            this.ingData.forEach(element => {
                if (ingredient.id === element.id) {
                    sum += ingredient.quantity.amount * element.estimatedCostInCents
                }
            })
            return sum
        }, 0)
        return `$${(total/100).toFixed(2)}`
    }

    listDirections() {
        return this.instructions.map(step => {
            return `Step ${step.number}: ${step.instruction}`
        }).join("\n")
    }
}

export default Recipe;
