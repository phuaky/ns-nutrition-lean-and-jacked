export interface NutritionItem {
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  fiber: number;
  components?: string[];
}

export interface MealRecommendation extends NutritionItem {
  day: string;
  mealType: 'lunch' | 'dinner';
}

// Parse the nutrition data from the attached file
export const nutritionData = {
  cafe: [
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
    { name: "Naked Steak Sandwich", calories: 409.2, carbs: 7.6, protein: 31.6, fat: 28.6, fiber: 2.3 }
  ],
  lunch: {
    monday: [
      { name: "Quinoa + Chicken Breast + Broccoli", calories: 486.3, carbs: 45.1, protein: 45.6, fat: 13.1, fiber: 7.2, components: ["Quinoa (171.9)", "Parsley Chicken Breast (234)", "Roasted Broccoli (80.4)"] },
      { name: "Quinoa + Beef + Broccoli", calories: 601.2, carbs: 45.1, protein: 42.1, fat: 28, fiber: 7.2, components: ["Quinoa (171.9)", "Minced Beef (349.9)", "Roasted Broccoli (80.4)"] },
      { name: "Quinoa + Tofu Chickpeas + Broccoli", calories: 455.2, carbs: 70.3, protein: 20.1, fat: 9.2, fiber: 11.8, components: ["Quinoa (171.9)", "Sticky Sesame Chickpeas Tofu (203.9)", "Roasted Broccoli (80.4)"] }
    ],
    tuesday: [
      { name: "Mexican Rice + Chicken + Peppers", calories: 482.5, carbs: 43.6, protein: 34.2, fat: 18.3, fiber: 4.8, components: ["Mexican Tomato Rice (168.6)", "Mexican Chicken Thigh (253.2)", "Tomato Avocado Salsa (80.7)"] },
      { name: "Mexican Rice + Beef + Peppers", calories: 413.8, carbs: 45.2, protein: 22.4, fat: 14.9, fiber: 5.2, components: ["Mexican Tomato Rice (168.6)", "Beef Bulgogi (164.5)", "Tomato Avocado Salsa (80.7)"] },
      { name: "Mexican Rice + Tofu Beans + Peppers", calories: 361.2, carbs: 51.6, protein: 18.4, fat: 10.1, fiber: 9.5, components: ["Mexican Tomato Rice (168.6)", "Mexican Tofu Beans (111.9)", "Tomato Avocado Salsa (80.7)"] }
    ],
    wednesday: [
      { name: "Pasta + Chicken + Broccoli", calories: 399.1, carbs: 41.3, protein: 36.9, fat: 10.7, fiber: 8.1, components: ["Whole Wheat Pasta (201)", "Mixed Herbs Chicken (141.3)", "Broccoli Mushroom (56.8)"] },
      { name: "Pasta + Beef + Broccoli", calories: 504.5, carbs: 43.6, protein: 34.8, fat: 23.5, fiber: 8.4, components: ["Whole Wheat Pasta (201)", "Mixed Herbs Beef (246.7)", "Broccoli Mushroom (56.8)"] },
      { name: "Rice + Paneer + Broccoli", calories: 591.1, carbs: 43.7, protein: 27.2, fat: 33.6, fiber: 6.7, components: ["Multigrain Rice (144)", "Mixed Herbs Paneer (390.3)", "Broccoli Mushroom (56.8)"] }
    ],
    thursday: [
      { name: "Lentils + Chicken + Eggplant", calories: 296.6, carbs: 30.6, protein: 33.4, fat: 6.4, fiber: 9.4, components: ["Lentils (128.8)", "Tomato Curry Chicken (137)", "Indian Curry Eggplant (48.2)"] },
      { name: "Lentils + Beef + Eggplant", calories: 370.1, carbs: 32.5, protein: 29.9, fat: 15, fiber: 9.3, components: ["Lentils (128.8)", "Tomato Curry Beef (210.1)", "Indian Curry Eggplant (48.2)"] },
      { name: "Lentils + Tofu Tempeh + Eggplant", calories: 344.9, carbs: 35.1, protein: 23.1, fat: 14.4, fiber: 12.8, components: ["Lentils (128.8)", "Tomato Curry Tofu Tempeh (167.9)", "Indian Curry Eggplant (48.2)"] }
    ],
    friday: [
      { name: "Buckwheat Noodles + Chicken + Cabbage", calories: 552.4, carbs: 45.3, protein: 46.4, fat: 22.2, fiber: 5.4, components: ["Buckwheat Noodles (169)", "Paprika Chicken (350.4)", "Cabbage Capsicum (33)"] },
      { name: "Buckwheat Noodles + Beef + Cabbage", calories: 673.2, carbs: 45.3, protein: 42.8, fat: 37.5, fiber: 5.4, components: ["Buckwheat Noodles (169)", "Paprika Beef (471.2)", "Cabbage Capsicum (33)"] },
      { name: "Rice + Teriyaki Tofu + Cabbage", calories: 350, carbs: 43.4, protein: 16.9, fat: 11.8, fiber: 5.3, components: ["Multigrain Rice (144)", "Teriyaki Tofu (173)", "Cabbage Capsicum (33)"] }
    ],
    saturday: [
      { name: "Lentils + Chicken Thigh + Tahini Salad", calories: 449.4, carbs: 25.9, protein: 44.9, fat: 18.6, fiber: 10.2, components: ["Lentils (128.8)", "Garlic Herbs Chicken Thigh (244.5)", "Tahini Salad (76.1)"] },
      { name: "Lentils + Beef + Tahini Salad", calories: 645.9, carbs: 23.4, protein: 40.4, fat: 42.6, fiber: 10.1, components: ["Lentils (128.8)", "Garlic Herbs Beef (441)", "Tahini Salad (76.1)"] },
      { name: "Lentils + Pesto Tofu + Tahini Salad", calories: 578.2, carbs: 46.3, protein: 52.7, fat: 19.1, fiber: 16.4, components: ["Lentils (128.8)", "Pesto Tofu Edamame (373.3)", "Tahini Salad (76.1)"] }
    ],
    sunday: [
      { name: "Sweet Potatoes + Chicken + Cauliflower", calories: 353.4, carbs: 38.6, protein: 30.8, fat: 7.2, fiber: 8.2, components: ["Sweet Potatoes (151.3)", "Chickpeas Curry Chicken (128.8)", "Cauliflower Purple Cabbage (73.3)"] },
      { name: "Sweet Potatoes + Beef + Cauliflower", calories: 437.0, carbs: 38.6, protein: 28.2, fat: 27.4, fiber: 8.2, components: ["Sweet Potatoes (151.3)", "Curry Minced Beef (212.4)", "Cauliflower Purple Cabbage (73.3)"] },
      { name: "Sweet Potatoes + Tofu Tempeh + Cauliflower", calories: 355.7, carbs: 41.1, protein: 16.8, fat: 12.6, fiber: 14.4, components: ["Sweet Potatoes (151.3)", "Chickpeas Curry Tofu Tempeh (131.1)", "Cauliflower Purple Cabbage (73.3)"] }
    ]
  },
  dinner: {
    monday: [
      { name: "Lemon Rice + Tandoori Chicken + Vegetables", calories: 412, carbs: 46.3, protein: 33.1, fat: 19.5, fiber: 6.6, components: ["Lemon Rice (218.4)", "Tandoori Chicken Thigh (193.5)", "Cauliflower Pumpkin (85)", "Chickpeas Salad (80.4)"] },
      { name: "Lemon Rice + Curry Beef + Vegetables", calories: 509.1, carbs: 48.7, protein: 37.8, fat: 27.3, fiber: 6.9, components: ["Lemon Rice (218.4)", "Curry Beef (290.6)", "Cauliflower Pumpkin (85)", "Chickpeas Salad (80.4)"] },
      { name: "Lemon Rice + Spinach Tofu + Vegetables", calories: 440.3, carbs: 60.4, protein: 16.1, fat: 15.7, fiber: 10.2, components: ["Lemon Rice (218.4)", "Spinach Tofu (136.9)", "Cauliflower Pumpkin (85)", "Chickpeas Salad (80.4)"] }
    ],
    tuesday: [
      { name: "Quinoa + Chicken Kebab + Greek Salad", calories: 337.5, carbs: 28.2, protein: 38.3, fat: 8.8, fiber: 4.1, components: ["Quinoa (120)", "Chicken Breast Kebab (174.5)", "Zucchini Red Onions (38.8)", "Greek Salad (34.2)"] },
      { name: "Quinoa + Salmon + Greek Salad", calories: 372.1, carbs: 28.3, protein: 24.5, fat: 17.4, fiber: 4.1, components: ["Quinoa (120)", "Lemon Herbs Salmon (209.1)", "Zucchini Red Onions (38.8)", "Greek Salad (34.2)"] },
      { name: "Dhal + Hummus + Greek Salad", calories: 316.2, carbs: 46.8, protein: 12.6, fat: 5.5, fiber: 10.7, components: ["Curry Dhal (142.3)", "Red Pepper Hummus (100.9)", "Zucchini Red Onions (38.8)", "Greek Salad (34.2)"] }
    ],
    wednesday: [
      { name: "Mexican Rice + Chicken + Vegetables", calories: 428.3, carbs: 51.1, protein: 21, fat: 14.1, fiber: 7.4, components: ["Mexican Rice (260)", "Spiced Chicken Thigh (128.6)", "Rainbow Capsicum (12.9)", "Tomato Avocado Salsa (26.8)"] },
      { name: "Sweet Potato + Beef + Vegetables", calories: 514.3, carbs: 33.6, protein: 24.9, fat: 30, fiber: 4, components: ["Baked Sweet Potato (102)", "Mexican Ground Beef (372.6)", "Rainbow Capsicum (12.9)", "Tomato Avocado Salsa (26.8)"] },
      { name: "Dhal + Tofu + Vegetables", calories: 342, carbs: 67.3, protein: 14.2, fat: 6.4, fiber: 11.8, components: ["Tomato Curry Dahl (240.3)", "Cajun Tofu (82.3)", "Rainbow Capsicum (12.9)", "Tomato Avocado Salsa (26.8)"] }
    ],
    thursday: [
      { name: "Pandan Rice + Chicken + Vegetables", calories: 410.1, carbs: 42.0, protein: 28.4, fat: 11.7, fiber: 4.8, components: ["Pandan Multigrain Rice (181.5)", "Hainanese Chicken (146.9)", "Garlic Ginger Cabbage (49.9)", "Chinese Cucumber Salad (29.4)"] },
      { name: "Pandan Rice + Barramundi + Vegetables", calories: 350.0, carbs: 42.8, protein: 23.3, fat: 5.7, fiber: 4.8, components: ["Pandan Multigrain Rice (181.5)", "Baked Barramundi (87.3)", "Garlic Ginger Cabbage (49.9)", "Chinese Cucumber Salad (29.4)"] },
      { name: "Dhal + Garlic Tofu + Vegetables", calories: 304.9, carbs: 34.9, protein: 13.6, fat: 7.9, fiber: 6.7, components: ["Curry Dhal (142.3)", "Garlic Tofu (82.9)", "Garlic Ginger Cabbage (49.9)", "Chinese Cucumber Salad (29.4)"] }
    ],
    friday: [
      { name: "Quinoa + Curry Chicken + Vegetables", calories: 392.1, carbs: 35.8, protein: 32.6, fat: 13.3, fiber: 6.1, components: ["Quinoa (120)", "Curry Baked Chicken (227.1)", "Baked Pumpkin (83.3)", "Japanese Wafu Salad (45)"] },
      { name: "Mashed Potato + Salmon + Vegetables", calories: 538.9, carbs: 28.9, protein: 28.7, fat: 22.3, fiber: 4.5, components: ["Mashed Potato Sweet Potato (100.9)", "Miso Baked Salmon (293)", "Baked Pumpkin (83.3)", "Japanese Wafu Salad (45)"] },
      { name: "Dhal + Teriyaki Tofu + Vegetables", calories: 407.2, carbs: 34.5, protein: 24.5, fat: 6.0, fiber: 12.6, components: ["Green Peas Curry Dahl (179.1)", "Teriyaki Tofu (89.2)", "Baked Pumpkin (83.3)", "Japanese Wafu Salad (45)"] }
    ],
    saturday: [
      { name: "Lemongrass Rice + Curry Chicken + Vegetables", calories: 403.7, carbs: 44.1, protein: 37.0, fat: 8.4, fiber: 5.3, components: ["Lemongrass Ginger Rice (165.8)", "Spicy Lemongrass Chicken (184.4)", "Roasted Chili Broccoli (40.1)", "Asam Kerabu Salad (53.4)"] },
      { name: "Lemongrass Rice + Barramundi + Vegetables", calories: 332.3, carbs: 42.2, protein: 23.6, fat: 6.9, fiber: 5.3, components: ["Lemongrass Ginger Rice (165.8)", "Salt Baked Barramundi (113.3)", "Roasted Chili Broccoli (40.1)", "Asam Kerabu Salad (53.4)"] },
      { name: "Dhal + Garlic Soy Tofu + Vegetables", calories: 703.1, carbs: 63.7, protein: 42.6, fat: 25.0, fiber: 16.9, components: ["Tomato Curry Dhal (240.3)", "Garlic Soy Tofu Tempeh (409.6)", "Roasted Chili Broccoli (40.1)", "Asam Kerabu Salad (53.4)"] }
    ],
    sunday: [
      { name: "Multigrain Rice + Thai Beef + Vegetables", calories: 273.7, carbs: 39.6, protein: 22.8, fat: 12.0, fiber: 6.3, components: ["Multigrain Rice (172.8)", "Thai Basil Beef (156.1)", "Mixed Mushroom Broccoli (67)", "Young Papaya Salad (33.8)"] },
      { name: "Pasta + Chicken + Vegetables", calories: 387.2, carbs: 29.6, protein: 29.7, fat: 13.9, fiber: 8.2, components: ["Whole Wheat Pasta (130.5)", "Sze Chuan Chicken (187.4)", "Mixed Mushroom Broccoli (67)", "Young Papaya Salad (33.8)"] },
      { name: "Dhal + Thai Tofu + Vegetables", calories: 357.5, carbs: 35.5, protein: 22.1, fat: 5.6, fiber: 12.8, components: ["Green Peas Curry Dahl (179.1)", "Thai Basil Tofu (77.6)", "Mixed Mushroom Broccoli (67)", "Young Papaya Salad (33.8)"] }
    ]
  }
};

export function getDayName(): string {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[new Date().getDay()];
}

export function getMealRecommendations(
  day: string, 
  mealType: 'lunch' | 'dinner', 
  targetCalories: number, 
  tolerance: number = 100
): NutritionItem[] {
  const dayData = nutritionData[mealType][day as keyof typeof nutritionData.lunch] || 
                 nutritionData[mealType].monday;
  
  return dayData.filter(meal => 
    Math.abs(meal.calories - targetCalories) <= tolerance
  ).slice(0, 3);
}

export function calculateNutritionTotals(meals: NutritionItem[]): NutritionItem {
  return meals.reduce((total, meal) => ({
    name: 'Daily Total',
    calories: total.calories + meal.calories,
    carbs: total.carbs + meal.carbs,
    protein: total.protein + meal.protein,
    fat: total.fat + meal.fat,
    fiber: total.fiber + meal.fiber
  }), { name: 'Daily Total', calories: 0, carbs: 0, protein: 0, fat: 0, fiber: 0 });
}
