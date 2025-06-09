export interface NutritionItem {
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  fiber: number;
}

export interface MealOption {
  base: NutritionItem[];
  nonVeganProtein: NutritionItem[];
  veganProtein?: NutritionItem[];
  vegetarianProtein?: NutritionItem[];
  veggies: NutritionItem[];
  toppings: NutritionItem[];
  dressings: NutritionItem[];
  sides?: NutritionItem[];
  desserts?: NutritionItem[];
}

export interface DailyMeals {
  lunch: MealOption;
  dinner: MealOption;
}

export const cafeItems: NutritionItem[] = [
  { name: "Caesar Salad", calories: 345.7, carbs: 2.4, protein: 44.1, fat: 17.7, fiber: 0.4 },
  { name: "Quesadilla with Mixed Green - Smoked Salmon", calories: 659.2, carbs: 41.1, protein: 36.2, fat: 38.3, fiber: 5.3 },
  { name: "Quesadilla with Mixed Green - Minced Beef", calories: 673.2, carbs: 41.1, protein: 40.4, fat: 38, fiber: 5.3 },
  { name: "Quesadilla with Mixed Green - Ribeye", calories: 761.9, carbs: 41.1, protein: 50.4, fat: 43.4, fiber: 5.3 },
  { name: "Quesadilla with Mixed Green - Chicken Breast", calories: 642.6, carbs: 41.1, protein: 51.5, fat: 29.5, fiber: 5.3 },
  { name: "Spinach Omelette on Toast - Mushroom", calories: 496.7, carbs: 15, protein: 24.5, fat: 37.7, fiber: 2.1 },
  { name: "Spinach Omelette on Toast - Chicken Breast", calories: 619.2, carbs: 14.3, protein: 51.2, fat: 39.6, fiber: 2 },
  { name: "Avocado Toast with Eggs", calories: 936.6, carbs: 99.3, protein: 32.8, fat: 47.6, fiber: 15.6 },
  { name: "NS Breakfast Plate", calories: 681, carbs: 9.1, protein: 44.4, fat: 53.2, fiber: 6.6 },
  { name: "Buddha Bowl", calories: 705.2, carbs: 92.9, protein: 26.7, fat: 27.7, fiber: 25.3 },
  { name: "Mexican Burrito Bowl", calories: 539.8, carbs: 62.9, protein: 49, fat: 11.1, fiber: 18.2 },
  { name: "Prawn Mustard Salad", calories: 278.9, carbs: 10.8, protein: 27.9, fat: 14.9, fiber: 8.2 },
  { name: "Steak Salad Bowl", calories: 506.7, carbs: 16.6, protein: 39.3, fat: 31.3, fiber: 2.6 },
  { name: "Steak Sandwich", calories: 829, carbs: 70.2, protein: 52.4, fat: 38.3, fiber: 5 },
  { name: "Naked Steak Sandwich", calories: 409.2, carbs: 7.6, protein: 31.6, fat: 28.6, fiber: 2.3 },
  { name: "Yogurt Parfait", calories: 345.1, carbs: 30.3, protein: 10, fat: 20.5, fiber: 4.2 },
  { name: "Mixed Berries Smoothies", calories: 180.9, carbs: 16.1, protein: 18.2, fat: 5.5, fiber: 4.8 },
  { name: "Matcha Avo", calories: 297.5, carbs: 20.2, protein: 20.7, fat: 16.2, fiber: 6.8 },
  { name: "Espresso Cauli", calories: 352.7, carbs: 15.6, protein: 26.1, fat: 21.4, fiber: 14.3 },
  { name: "Green Power 2.0", calories: 212.6, carbs: 9.9, protein: 20.1, fat: 10.8, fiber: 4.6 },
  { name: "Almond Butter Avocado", calories: 363.7, carbs: 13.4, protein: 23.1, fat: 26.5, fiber: 7.4 }
];

export const weeklyMeals: Record<string, DailyMeals> = {
  monday: {
    lunch: {
      base: [
        { name: "Quinoa", calories: 171.9, carbs: 30, protein: 6.6, fat: 2.8, fiber: 3.3 }
      ],
      nonVeganProtein: [
        { name: "Parsley and Green Chili Baked Chicken Breast", calories: 234, carbs: 2.3, protein: 36.1, fat: 8.7, fiber: 0.3 },
        { name: "Parsley and Green Chili Baked Minced Beef", calories: 349.9, carbs: 2.3, protein: 32.6, fat: 23.5, fiber: 0.3 }
      ],
      veganProtein: [
        { name: "Sticky Sesame Chickpeas, Potato and Tofu", calories: 203.9, carbs: 27.5, protein: 10.6, fat: 5.8, fiber: 4.9 },
        { name: "Sticky Sesame 3-Bean & Potato", calories: 218.5, carbs: 31.9, protein: 10.7, fat: 4.3, fiber: 12.3 }
      ],
      veggies: [
        { name: "Roasted Broccoli and Red Onion", calories: 80.4, carbs: 12.8, protein: 2.9, fat: 1.7, fiber: 3.6 }
      ],
      toppings: [
        { name: "Pumpkin Seeds", calories: 57, carbs: 3, protein: 1.5, fat: 4.6, fiber: 0.3 }
      ],
      dressings: [
        { name: "Greek Yogurt", calories: 73.2, carbs: 2.9, protein: 2.5, fat: 5.6, fiber: 0 }
      ]
    },
    dinner: {
      base: [
        { name: "Lemon Rice", calories: 218.4, carbs: 31.2, protein: 5.7, fat: 7.7, fiber: 4 }
      ],
      nonVeganProtein: [
        { name: "Tandoori Chicken Thigh", calories: 193.5, carbs: 0.9, protein: 24.6, fat: 10.1, fiber: 0.4 },
        { name: "Curry Beef", calories: 290.6, carbs: 2.5, protein: 29.3, fat: 18, fiber: 0.7 }
      ],
      veganProtein: [
        { name: "Spinach Tofu", calories: 136.9, carbs: 13.9, protein: 6.6, fat: 6.5, fiber: 0.6 },
        { name: "Spinach Dhal", calories: 136, carbs: 24, protein: 8, fat: 1, fiber: 11 }
      ],
      veggies: [
        { name: "Roasted Cauliflower and Pumpkin", calories: 85, carbs: 14.2, protein: 3.1, fat: 1.7, fiber: 2.1 },
        { name: "Indian Chickpeas Salad", calories: 80.4, carbs: 10.8, protein: 3.5, fat: 2.6, fiber: 2.7 }
      ],
      toppings: [
        { name: "Fresh Coriander", calories: 52.9, carbs: 5.9, protein: 1.6, fat: 2.6, fiber: 1.9 }
      ],
      dressings: [
        { name: "Mint Yogurt", calories: 136.9, carbs: 6.1, protein: 4.9, fat: 10.5, fiber: 0.1 },
        { name: "Lime Wedge", calories: 64, carbs: 12, protein: 1.4, fat: 1.1, fiber: 4.1 }
      ]
    }
  },
  tuesday: {
    lunch: {
      base: [
        { name: "Mexican Tomato Rice", calories: 168.6, carbs: 36.7, protein: 3.8, fat: 0.7, fiber: 0.5 }
      ],
      nonVeganProtein: [
        { name: "Mexican Spiced Chicken Thigh", calories: 253.2, carbs: 0.8, protein: 30.7, fat: 12, fiber: 0.6 },
        { name: "Beef Bulgogi", calories: 164.5, carbs: 2.4, protein: 18.9, fat: 8.6, fiber: 1 }
      ],
      veganProtein: [
        { name: "Mexican Scrambled Tofu with Beans", calories: 111.9, carbs: 6.8, protein: 10.6, fat: 4.4, fiber: 2.1 },
        { name: "Mexican 3-Bean Chili", calories: 142.4, carbs: 17.1, protein: 10.1, fat: 3.3, fiber: 9 }
      ],
      veggies: [
        { name: "Tomato Avocado Salsa & Roasted Bell Pepper", calories: 80.7, carbs: 6.1, protein: 1.7, fat: 5, fiber: 3.7 }
      ],
      toppings: [
        { name: "Pumpkin Seeds", calories: 57, carbs: 3, protein: 1.5, fat: 4.6, fiber: 0.3 }
      ],
      dressings: [
        { name: "Greek Yogurt", calories: 73.2, carbs: 2.9, protein: 2.5, fat: 5.6, fiber: 0 }
      ]
    },
    dinner: {
      base: [
        { name: "Quinoa", calories: 120, carbs: 21.2, protein: 4.4, fat: 1.9, fiber: 2.8 },
        { name: "Curry Dhal", calories: 142.3, carbs: 19.7, protein: 9.8, fat: 1.4, fiber: 5.9 }
      ],
      nonVeganProtein: [
        { name: "Chicken Breast Kebab", calories: 174.5, carbs: 0.4, protein: 33.1, fat: 4.4, fiber: 0.2 },
        { name: "Lemon and Herbs Baked Salmon", calories: 209.1, carbs: 0.1, protein: 19.7, fat: 14.5, fiber: 0 }
      ],
      veganProtein: [
        { name: "Paneer Jalfrezi", calories: 110.8, carbs: 6.5, protein: 4.4, fat: 7.6, fiber: 2.1 },
        { name: "Roasted Red Pepper Hummus", calories: 100.9, carbs: 18.2, protein: 5.5, fat: 0.6, fiber: 4.8 }
      ],
      veggies: [
        { name: "Roasted Zucchini & Red Onions", calories: 38.8, carbs: 6.6, protein: 1.3, fat: 0.7, fiber: 1.1 },
        { name: "Greek Salad", calories: 34.2, carbs: 2.6, protein: 0.8, fat: 2.2, fiber: 1.1 }
      ],
      toppings: [
        { name: "Sunflower Seeds", calories: 573, carbs: 2.2, protein: 22.7, fat: 51, fiber: 10.8 }
      ],
      dressings: [
        { name: "Cucumber & Lime Raita", calories: 39.3, carbs: 3.1, protein: 6.3, fat: 0.2, fiber: 0.2 },
        { name: "Lemon Wedge", calories: 20, carbs: 10.7, protein: 1.2, fat: 0.3, fiber: 4.7 }
      ]
    }
  },
  wednesday: {
    lunch: {
      base: [
        { name: "Whole Wheat Pasta", calories: 201, carbs: 32.5, protein: 7.2, fat: 5.5, fiber: 4.8 },
        { name: "Multigrain Rice", calories: 144, carbs: 29.9, protein: 3.3, fat: 1.2, fiber: 2.3 }
      ],
      nonVeganProtein: [
        { name: "Mixed Herbs Baked Chicken Breast", calories: 141.3, carbs: 1.2, protein: 26.8, fat: 3.2, fiber: 0.3 },
        { name: "Mixed Herbs Stir Fry Minced Beef", calories: 246.7, carbs: 3.5, protein: 24.7, fat: 16, fiber: 0.8 }
      ],
      vegetarianProtein: [
        { name: "Mixed Herbs Pesto Paneer", calories: 390.3, carbs: 6.2, protein: 21, fat: 30.4, fiber: 1.6 }
      ],
      veganProtein: [
        { name: "Mixed Herbs Baked 3-Bean", calories: 212.5, carbs: 15.7, protein: 10.2, fat: 7.8, fiber: 9.4 }
      ],
      veggies: [
        { name: "Roasted Broccoli and Shiitake Mushroom", calories: 56.8, carbs: 7.6, protein: 2.9, fat: 2, fiber: 2.8 }
      ],
      toppings: [
        { name: "Sunflower Seeds", calories: 68.8, carbs: 0.3, protein: 2.7, fat: 6.1, fiber: 1.3 }
      ],
      dressings: [
        { name: "Pesto Sauce", calories: 135.1, carbs: 10, protein: 4, fat: 9.1, fiber: 3.6 }
      ]
    },
    dinner: {
      base: [
        { name: "Mexican Rice", calories: 260, carbs: 48.3, protein: 8.4, fat: 3.8, fiber: 5.8 },
        { name: "Baked Sweet Potato", calories: 102, carbs: 21.3, protein: 1.8, fat: 1.2, fiber: 2.4 },
        { name: "Tomato Curry Dahl", calories: 240.3, carbs: 31.3, protein: 18.8, fat: 1.8, fiber: 10.9 }
      ],
      nonVeganProtein: [
        { name: "Spiced Baked Chicken Thigh", calories: 128.6, carbs: 1.1, protein: 17.9, fat: 5.9, fiber: 0.3 },
        { name: "Mexican Ground Beef", calories: 372.6, carbs: 9.5, protein: 22.8, fat: 27.1, fiber: 1.6 }
      ],
      veganProtein: [
        { name: "Cajun Tofu", calories: 82.3, carbs: 4.1, protein: 8.1, fat: 3.7, fiber: 0.4 },
        { name: "Chickpeas and Corn Shashuka", calories: 77.2, carbs: 14.3, protein: 4, fat: 0.5, fiber: 3.2 }
      ],
      veggies: [
        { name: "Baked Rainbow Capsicum with Shredded Purple Cabbage", calories: 12.9, carbs: 0.8, protein: 0.3, fat: 1, fiber: 0.3 },
        { name: "Tomato Salsa with Avocado", calories: 26.8, carbs: 2.9, protein: 0.8, fat: 1.2, fiber: 1.3 }
      ],
      toppings: [
        { name: "Fresh Coriander", calories: 52.9, carbs: 5.9, protein: 1.6, fat: 2.6, fiber: 1.9 }
      ],
      dressings: [
        { name: "Green Chili Lime", calories: 23.9, carbs: 4.1, protein: 1.2, fat: 0.2, fiber: 1.2 },
        { name: "Fresh Herbs Yogurt", calories: 119.6, carbs: 4.9, protein: 4.3, fat: 9.4, fiber: 0 },
        { name: "Orange Juice", calories: 39, carbs: 9.1, protein: 0.7, fat: 0, fiber: 0.1 }
      ]
    }
  },
  thursday: {
    lunch: {
      base: [
        { name: "Lentils", calories: 128.8, carbs: 19.5, protein: 7.8, fat: 0.7, fiber: 6.9 }
      ],
      nonVeganProtein: [
        { name: "Tomato Curry Chicken Breast", calories: 137, carbs: 3.4, protein: 24.8, fat: 3.1, fiber: 0.9 },
        { name: "Tomato Curry Beef", calories: 210.1, carbs: 5.3, protein: 21.1, fat: 11.3, fiber: 0.8 }
      ],
      veganProtein: [
        { name: "Tomato Curry Tofu & Tempeh", calories: 167.9, carbs: 7.7, protein: 12.1, fat: 11, fiber: 3.7 },
        { name: "3-Bean Tomato Curry", calories: 128.5, carbs: 16.1, protein: 8.2, fat: 2, fiber: 8.2 }
      ],
      veggies: [
        { name: "Indian Curry Eggplant", calories: 48.2, carbs: 7.7, protein: 2.4, fat: 1.7, fiber: 1.9 }
      ],
      toppings: [
        { name: "Pumpkin Seeds", calories: 57, carbs: 3, protein: 1.5, fat: 4.6, fiber: 0.3 }
      ],
      dressings: [
        { name: "Lemon Wedge", calories: 4.2, carbs: 1.3, protein: 0.2, fat: 0.1, fiber: 0.4 }
      ]
    },
    dinner: {
      base: [
        { name: "Pandan Multigrain Rice", calories: 181.5, carbs: 33.5, protein: 5.8, fat: 2.7, fiber: 3.9 },
        { name: "Curry Dhal", calories: 142.3, carbs: 19.7, protein: 9.8, fat: 1.4, fiber: 5.9 }
      ],
      nonVeganProtein: [
        { name: "Hainanese Chicken Thigh", calories: 146.9, carbs: 0.4, protein: 20.4, fat: 7, fiber: 0.1 },
        { name: "Baked Barramundi with Garlic & Ginger", calories: 87.3, carbs: 1.2, protein: 19, fat: 0.8, fiber: 0 }
      ],
      veganProtein: [
        { name: "Garlic Tofu", calories: 82.9, carbs: 4.8, protein: 8.1, fat: 3.5, fiber: 0.4 }
      ],
      veggies: [
        { name: "Garlic and Ginger Cabbage with Shiitake Mushroom", calories: 49.9, carbs: 5.2, protein: 2.3, fat: 2.2, fiber: 0.7 },
        { name: "Chinese Style Cucumber and Tomato Salad", calories: 29.4, carbs: 3.5, protein: 1, fat: 1.2, fiber: 0.6 }
      ],
      toppings: [
        { name: "Fresh Coriander", calories: 52.9, carbs: 5.9, protein: 1.6, fat: 2.6, fiber: 1.9 }
      ],
      dressings: [
        { name: "Red Chili Sauce", calories: 42.6, carbs: 8, protein: 1.8, fat: 0.4, fiber: 2.7 },
        { name: "Fresh Herbs Yogurt", calories: 119.6, carbs: 4.9, protein: 4.3, fat: 9.4, fiber: 0 }
      ],
      sides: [
        { name: "Hard Boiled Egg", calories: 151.1, carbs: 0.3, protein: 13.2, fat: 10.9, fiber: 0 }
      ]
    }
  },
  friday: {
    lunch: {
      base: [
        { name: "Buckwheat Noodles", calories: 169, carbs: 27.3, protein: 6.5, fat: 4.6, fiber: 2 },
        { name: "Multigrain Rice", calories: 144, carbs: 29.9, protein: 3.3, fat: 1.2, fiber: 2.3 }
      ],
      nonVeganProtein: [
        { name: "Paprika Chicken Breast", calories: 350.4, carbs: 9.2, protein: 38.6, fat: 18, fiber: 1 },
        { name: "Paprika Beef", calories: 471.2, carbs: 9.2, protein: 35, fat: 33.3, fiber: 1 }
      ],
      veganProtein: [
        { name: "Teriyaki Tofu", calories: 173, carbs: 5.7, protein: 12.1, fat: 11.4, fiber: 0.6 }
      ],
      vegetarianProtein: [
        { name: "Paprika Tomato Paneer", calories: 91.7, carbs: 4.3, protein: 5.9, fat: 5.3, fiber: 0.7 }
      ],
      veggies: [
        { name: "Shredded Cabbage and Capsicum", calories: 33, carbs: 7.8, protein: 1.5, fat: 0.2, fiber: 2.4 }
      ],
      toppings: [
        { name: "Flaxseeds", calories: 75.8, carbs: 1, protein: 0.6, fat: 1.4, fiber: 0.9 }
      ],
      dressings: [
        { name: "Green Chili", calories: 25.8, carbs: 5.2, protein: 0.8, fat: 0.2, fiber: 7.1 }
      ]
    },
    dinner: {
      base: [
        { name: "Quinoa", calories: 120, carbs: 21.2, protein: 4.4, fat: 1.9, fiber: 2.8 },
        { name: "Mashed Potato and Sweet Potato", calories: 100.9, carbs: 21.3, protein: 1.8, fat: 1.1, fiber: 2.4 }
      ],
      nonVeganProtein: [
        { name: "Curry Baked Chicken Thigh", calories: 227.1, carbs: 7.3, protein: 28.2, fat: 9.5, fiber: 0.9 },
        { name: "Miso Baked Salmon", calories: 293, carbs: 1.5, protein: 26.5, fat: 20, fiber: 0.2 }
      ],
      veganProtein: [
        { name: "Teriyaki Tofu", calories: 89.2, carbs: 5.6, protein: 8.5, fat: 3.7, fiber: 0.4 },
        { name: "Green Peas Curry Dahl", calories: 179.1, carbs: 23.1, protein: 13.8, fat: 1.6, fiber: 8.9 }
      ],
      veggies: [
        { name: "Baked Pumpkin and White Onion", calories: 83.3, carbs: 13.7, protein: 1.3, fat: 2.7, fiber: 1.8 },
        { name: "Japanese Wafu Salad", calories: 45, carbs: 7.8, protein: 2.1, fat: 0.6, fiber: 1.9 }
      ],
      toppings: [
        { name: "Spring Onion", calories: 30.4, carbs: 4.6, protein: 1.7, fat: 0.2, fiber: 2.2 }
      ],
      dressings: [
        { name: "Citrus Vinaigrette", calories: 330.5, carbs: 5, protein: 0.4, fat: 33.8, fiber: 0.1 },
        { name: "Fresh Herbs Yogurt", calories: 119.6, carbs: 4.9, protein: 4.3, fat: 9.4, fiber: 0 }
      ],
      sides: [
        { name: "Daikon Miso Soup", calories: 20, carbs: 2.9, protein: 1.2, fat: 0.4, fiber: 1.1 }
      ]
    }
  },
  saturday: {
    lunch: {
      base: [
        { name: "Lentils", calories: 128.8, carbs: 19.5, protein: 7.8, fat: 0.7, fiber: 6.9 }
      ],
      nonVeganProtein: [
        { name: "Garlic & Herbs Baked Chicken Thigh", calories: 244.5, carbs: 2.9, protein: 32.8, fat: 11.2, fiber: 0.3 },
        { name: "Garlic & Herbs Minced Beef", calories: 441, carbs: 1.2, protein: 28.3, fat: 35.2, fiber: 0.7 }
      ],
      veganProtein: [
        { name: "Pesto Tofu with Edamame", calories: 373.3, carbs: 22.4, protein: 40.6, fat: 11.9, fiber: 7.2 },
        { name: "Pesto 3-Bean Salsa", calories: 190.4, carbs: 14, protein: 9.8, fat: 6.2, fiber: 8.9 }
      ],
      veggies: [
        { name: "Tahini Salad", calories: 76.1, carbs: 3.9, protein: 2.3, fat: 5.7, fiber: 1.5 }
      ],
      toppings: [
        { name: "Sunflower Seeds", calories: 68.8, carbs: 0.3, protein: 2.7, fat: 6.1, fiber: 1.3 }
      ],
      dressings: [
        { name: "Sweet Basil Vinaigrette", calories: 120, carbs: 4.4, protein: 0.3, fat: 11.4, fiber: 0.3 }
      ],
      desserts: [
        { name: "Banana Yogurt Crunch", calories: 179, carbs: 11.9, protein: 7.6, fat: 12.2, fiber: 2 },
        { name: "Nutty Pudding", calories: 157.2, carbs: 11.6, protein: 3.7, fat: 13.1, fiber: 4.5 }
      ]
    },
    dinner: {
      base: [
        { name: "Lemongrass and Ginger Multigrain Rice", calories: 165.8, carbs: 30.3, protein: 5.4, fat: 2.6, fiber: 3.7 },
        { name: "Tomato Curry Dhal", calories: 240.3, carbs: 31.3, protein: 18.8, fat: 1.8, fiber: 10.9 }
      ],
      nonVeganProtein: [
        { name: "Spicy Lemongrass Curry Chicken Breast", calories: 184.4, carbs: 2.7, protein: 33.2, fat: 4.4, fiber: 0.2 },
        { name: "Salt Baked Barramundi", calories: 113.3, carbs: 1, protein: 19.8, fat: 3.3, fiber: 0 }
      ],
      veganProtein: [
        { name: "Garlic Soy Tofu and Tempeh", calories: 409.6, carbs: 20.3, protein: 36.8, fat: 21, fiber: 1.4 }
      ],
      veggies: [
        { name: "Roasted Chili Broccoli", calories: 40.1, carbs: 2.8, protein: 4.1, fat: 1.4, fiber: 3.9 },
        { name: "Asam Kerabu Salad with Chili Lime Dressing", calories: 53.4, carbs: 11.1, protein: 1.7, fat: 0.3, fiber: 1.2 }
      ],
      toppings: [
        { name: "Baked Anchovies", calories: 280.7, carbs: 0.9, protein: 56.5, fat: 5.7, fiber: 0 },
        { name: "Roasted Peanuts", calories: 623, carbs: 11.5, protein: 25, fat: 53, fiber: 6.4 }
      ],
      dressings: [
        { name: "Sambal Chili Sauce", calories: 214.1, carbs: 11.9, protein: 2.7, fat: 17.4, fiber: 3.6 },
        { name: "Fresh Herbs Yogurt", calories: 119.6, carbs: 4.9, protein: 4.3, fat: 9.4, fiber: 0 }
      ],
      sides: [
        { name: "Hard Boiled Egg", calories: 151.1, carbs: 0.3, protein: 13.2, fat: 10.9, fiber: 0 }
      ]
    }
  },
  sunday: {
    lunch: {
      base: [
        { name: "Sweet Potatoes", calories: 151.3, carbs: 32, protein: 2.8, fat: 1.6, fiber: 3.7 }
      ],
      nonVeganProtein: [
        { name: "Chickpeas Curry with Chicken Breast", calories: 128.8, carbs: 1.4, protein: 24.7, fat: 2.4, fiber: 0.6 },
        { name: "Curry Minced Beef", calories: 212.4, carbs: 1.4, protein: 22.4, fat: 23.8, fiber: 0.6 }
      ],
      veganProtein: [
        { name: "Chickpeas Curry with Tofu & Tempeh", calories: 131.1, carbs: 4.6, protein: 10, fat: 7.6, fiber: 2.7 },
        { name: "3-Bean Curry", calories: 151.9, carbs: 14.3, protein: 8.5, fat: 2.4, fiber: 8.2 }
      ],
      veggies: [
        { name: "Roasted Cauliflower & Purple Cabbage", calories: 73.3, carbs: 5.2, protein: 3.3, fat: 3.2, fiber: 3.5 }
      ],
      toppings: [
        { name: "Jalapenos", calories: 1.8, carbs: 0.3, protein: 0.1, fat: 0, fiber: 0.1 }
      ],
      dressings: [
        { name: "Lime Wedge", calories: 16, carbs: 3, protein: 0.4, fat: 0.3, fiber: 1 }
      ]
    },
    dinner: {
      base: [
        { name: "Multigrain Rice", calories: 172.8, carbs: 31.6, protein: 5.6, fat: 2.7, fiber: 3.8 },
        { name: "Whole Wheat Pasta", calories: 130.5, carbs: 24.6, protein: 5.8, fat: 0.8, fiber: 5.7 }
      ],
      nonVeganProtein: [
        { name: "Thai Basil Beef", calories: 156.1, carbs: 2.1, protein: 16.9, fat: 8.9, fiber: 0.5 },
        { name: "Sze Chuan Chicken Breast", calories: 187.4, carbs: 2, protein: 23.6, fat: 9.3, fiber: 0.3 }
      ],
      veganProtein: [
        { name: "Thai Basil Tofu", calories: 77.6, carbs: 4.6, protein: 7.6, fat: 3.2, fiber: 0.7 },
        { name: "Green Peas Curry Dahl", calories: 179.1, carbs: 23.1, protein: 13.8, fat: 1.6, fiber: 8.9 }
      ],
      veggies: [
        { name: "Baked Mixed Mushroom & Broccoli", calories: 67, carbs: 4.9, protein: 4.3, fat: 3.3, fiber: 3.7 },
        { name: "Young Papaya Salad", calories: 33.8, carbs: 7, protein: 0.4, fat: 0.1, fiber: 2.2 }
      ],
      toppings: [
        { name: "Pumpkin Seeds or Sunflower Seeds", calories: 573, carbs: 2.2, protein: 22.7, fat: 51, fiber: 10.8 }
      ],
      dressings: [
        { name: "Mushroom and Black Pepper Sauce", calories: 56.1, carbs: 7.2, protein: 1, fat: 2.6, fiber: 0.6 },
        { name: "Fresh Herbs Yogurt", calories: 119.6, carbs: 4.9, protein: 4.3, fat: 9.4, fiber: 0 }
      ]
    }
  }
};