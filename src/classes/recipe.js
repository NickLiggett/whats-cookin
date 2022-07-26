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
        let reduced = this.ingredients.reduce((list, ingredient) => {
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
        return reduced
    }

    determineCostOfAllIngredients() {
        let totalCost = 0
        this.ingredients.forEach(ingredient => {
            this.ingData.forEach(element => {
                if (ingredient.id === element.id) {
                    totalCost += ingredient.quantity.amount * element.estimatedCostInCents  
                }
            })
        })
        return `$${(totalCost/100).toFixed(2)}`
    }


    listDirections() {
        let steps = this.instructions.map(step => {
            return `Step ${step.number}: ${step.instruction}`
        }).join("\n")
        return steps
    }
}

export default Recipe;