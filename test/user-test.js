import { expect } from 'chai';
import User from '../src/classes/user-class';
import RecipeRepository from '../src/classes/RecipeRepository'

describe('User', () => {
    let user;
    let user1;
    let recipe1;
    let recipe2;
    let recipeRepo;
    let recDataSet;

    beforeEach(() => {
        user1 =  { "name": "Dirty Steve", "id": 420 }
        user = new User(user1)
        recipe1 = { "id": 595736,
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

    recipe2 = {
      "id": 412309,
      "image": "https://spoonacular.com/recipeImages/412309-556x370.jpeg",
      "ingredients": [
        {
          "id": 1002030,
          "quantity": {
            "amount": 4,
            "unit": "teaspoons"
          }
        },
        {
          "id": 19334,
          "quantity": {
            "amount": 8,
            "unit": "tablespoons"
          }
        },
        {
          "id": 1001,
          "quantity": {
            "amount": 2,
            "unit": "cups"
          }
        },
        {
          "id": 4582,
          "quantity": {
            "amount": 4,
            "unit": "servings"
          }
        },
        {
          "id": 2031,
          "quantity": {
            "amount": 4,
            "unit": "teaspoons"
          }
        },
        {
          "id": 5100,
          "quantity": {
            "amount": 1,
            "unit": "pound"
          }
        },
        {
          "id": 2009,
          "quantity": {
            "amount": 4,
            "unit": "teaspoons"
          }
        },
        {
          "id": 1022020,
          "quantity": {
            "amount": 4,
            "unit": "teaspoons"
          }
        },
        {
          "id": 6168,
          "quantity": {
            "amount": 8,
            "unit": "cups"
          }
        },
        {
          "id": 9176,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 2026,
          "quantity": {
            "amount": 4,
            "unit": "teaspoons"
          }
        },
        {
          "id": 1042047,
          "quantity": {
            "amount": 1.5,
            "unit": "tablespoons"
          }
        },
        {
          "id": 1042047,
          "quantity": {
            "amount": 4,
            "unit": "teaspoons"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Mix the hot sauce, butter, mango habanero sauce, brown sugar, chili powder, garlic powder, onion powder, black pepper, cayenne pepper and seasoning salt in a bowl. Stir vigorously until completely combined.",
          "number": 1
        }
      ],
      "name": "Dirty Steve's Original Wing Sauce",
      "tags": [
        "sauce"
      ]
    }
    recDataSet = [recipe1, recipe2];
    recipeRepo = new RecipeRepository(recDataSet);

    })

    it('should be a function', () => {
        expect(User).to.be.a('function');
    })

    it('should be an instance of recipe', () => {
        expect(user).to.be.an.instanceof(User)
    })

    it('should have a name', () => {
        expect(user.name).to.equal('Dirty Steve')
    })

    it('should have an id', () => {
        expect(user.id).to.equal(420)
    })

    it('should be able to add and remove recipes to cook', () => {
        expect(user.recipesToCook).to.deep.equal([])
        user.addRecipeToCook(recipe1)
        expect(user.recipesToCook).to.deep.equal([recipe1])
        user.removeRecipeToCook(recipe1)
        expect(user.recipesToCook).to.deep.equal([])
    })

    it('should filter recipes by tags', () => {
        user.addRecipeToCook(recipe1)
        user.addRecipeToCook(recipe2)
        expect(user.recipesToCook).to.deep.equal([recipe1, recipe2])
        expect(user.userFilterTags('sauce')).to.deep.equal([recipe2])
    })

    it('should filter recipes by name', () => {
        user.addRecipeToCook(recipe1)
        user.addRecipeToCook(recipe2)
        expect(user.recipesToCook).to.deep.equal([recipe1, recipe2])
        expect(user.userFilterNames('Dirty')).to.deep.equal([recipe2])
    }) 
})
