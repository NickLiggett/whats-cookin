import { expect } from 'chai';
import Ingredient from '../src/classes/ingredient';
import Recipe from '../src/classes/recipe';

describe('Recipe', () => {
    let recipe;
    let ingredient1;
    let ingredient2;
    let ingDataSet;
    let recDataSet;
    let recipeDetails;

  beforeEach(() => {
      ingredient1 =     {
        "id": 20081,
        "name": "wheat flour",
        "estimatedCostInCents": 142
      }
      ingredient2 =     {
        "id": 18372,
        "name": "bicarbonate of soda",
        "estimatedCostInCents": 582
      }
      ingDataSet = [ingredient1, ingredient2]
      recipeDetails = {"id": 595736,
      "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      "ingredients": [
        {
          "id": 20081,
          "quantity": {
            "amount": 1.5,
            "unit": "c"
          }
        },
        {
          "id": 18372,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        },
        {
          "id": 1123,
          "quantity": {
            "amount": 1,
            "unit": "large"
          }
        }], "instructions": [
          {
            "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
            "number": 1
          },
          {
            "instruction": "Add egg and vanilla and mix until combined.",
            "number": 2
          },
          {
            "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
            "number": 3
          },
          {
            "instruction": "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.",
            "number": 4
          },
          {
            "instruction": "Bake for 9 to 10 minutes, or until you see the edges start to brown.",
            "number": 5
          },
          {
            "instruction": "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.",
            "number": 6
          }
        ],
        "name": "Loaded Chocolate Chip Pudding Cookie Cups",
        "tags": [
          "antipasti",
          "starter",
          "snack",
          "appetizer",
          "antipasto",
          "hor d'oeuvre"
        ]}
        recipe = new Recipe(recipeDetails, ingDataSet)
    })
    it('should be a function', () => {
        expect(Recipe).to.be.a('function');
    })

    it('should be an instance of recipe', () => {
        expect(recipe).to.be.an.instanceof(Recipe)
    })

    it('should have an id', () => {
        expect(recipe.id).to.equal(595736)
    })

    it('should have an image', () => {
        expect(recipe.image).to.equal('https://spoonacular.com/recipeImages/595736-556x370.jpg')
    })
    it('should have a specific ingredient at index 0', () => {
        expect(recipe.ingredients[0].id).to.equal(20081)
    })

    it('should have directions', () => {
        expect(recipe.instructions[0]["instruction"]).to.equal('In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.')
    })

    it('should have a method to determine ingredient names', () => {
        expect(recipe.determineIngredientNames()).to.equal('wheat flour: 1.50 c' + '\n' + 'bicarbonate of soda: 0.50 tsp')
    })

    it('should calculate the total cost of required ingredients', () => {
        expect(recipe.determineCostOfAllIngredients()).to.equal(`$5.04`)
    })

    it('should provide instructions', () => {
        expect(recipe.listDirections()).to.deep.equal(
            'Step 1: In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.' + '\n' +
            'Step 2: Add egg and vanilla and mix until combined.' + '\n' +
            'Step 3: Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.' + '\n' +
            'Step 4: Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.' + '\n' +
            'Step 5: Bake for 9 to 10 minutes, or until you see the edges start to brown.' + '\n' +
            'Step 6: Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.'
          )
    })
})
