export interface InBodyData {
  currentWeight: number; // kg
  currentBodyFatPercentage: number; // %
  targetWeight: number; // kg
  targetBodyFatPercentage: number; // %
  height: number; // cm
  age: number; // years
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'lightlyActive' | 'moderatelyActive' | 'veryActive' | 'extraActive';
  daysToGoal: number;
  skeletalMuscleMass?: number; // kg
  inBodyScore?: number;
}

export interface CalorieCalculation {
  bmr: number;
  tdee: number;
  dailyDeficit: number;
  dailyBudget: number;
  totalFatLossKg: number;
  leanBodyMass: number;
  targetLeanBodyMass: number;
}

export interface MacroTargets {
  protein: number;
  carbs: number;
  fat: number;
  proteinCalories: number;
  carbCalories: number;
  fatCalories: number;
}

export interface MealBudgets {
  breakfast: number;
  lunch: number;
  dinner: number;
  total: number;
  remaining: number;
}

// Activity level multipliers for TDEE calculation
const activityMultipliers = {
  sedentary: 1.2, // Little to no exercise
  lightlyActive: 1.375, // Light exercise 1-3 days/week
  moderatelyActive: 1.55, // Moderate exercise 3-5 days/week
  veryActive: 1.725, // Heavy exercise 6-7 days/week
  extraActive: 1.9 // Very heavy physical job or training
};

// Calculate Basal Metabolic Rate using Mifflin-St Jeor equation
export function calculateBMR(data: InBodyData): number {
  const { currentWeight, height, age, gender } = data;
  
  // Mifflin-St Jeor equation
  if (gender === 'male') {
    return (10 * currentWeight) + (6.25 * height) - (5 * age) + 5;
  } else {
    return (10 * currentWeight) + (6.25 * height) - (5 * age) - 161;
  }
}

// Calculate Total Daily Energy Expenditure
export function calculateTDEE(bmr: number, activityLevel: InBodyData['activityLevel']): number {
  return bmr * activityMultipliers[activityLevel];
}

// Calculate lean body mass from weight and body fat percentage
export function calculateLeanBodyMass(weight: number, bodyFatPercentage: number): number {
  return weight * (1 - bodyFatPercentage / 100);
}

// Calculate required daily calorie deficit
export function calculateDailyDeficit(data: InBodyData): number {
  const { currentWeight, currentBodyFatPercentage, targetBodyFatPercentage, daysToGoal } = data;
  
  // Calculate current and target fat mass
  const currentFatMass = currentWeight * (currentBodyFatPercentage / 100);
  const targetFatMass = data.targetWeight * (targetBodyFatPercentage / 100);
  
  // Total fat loss needed in kg
  const totalFatLossKg = currentFatMass - targetFatMass;
  
  // Each kg of fat = 7,700 kcal
  const totalCalorieDeficit = totalFatLossKg * 7700;
  
  // Daily deficit needed
  return totalCalorieDeficit / daysToGoal;
}

// Main calculation function that returns all necessary values
export function calculateCalories(data: InBodyData): CalorieCalculation {
  const bmr = calculateBMR(data);
  const tdee = calculateTDEE(bmr, data.activityLevel);
  const dailyDeficit = calculateDailyDeficit(data);
  const dailyBudget = tdee - dailyDeficit;
  
  // Calculate lean body mass values
  const leanBodyMass = calculateLeanBodyMass(data.currentWeight, data.currentBodyFatPercentage);
  const targetLeanBodyMass = calculateLeanBodyMass(data.targetWeight, data.targetBodyFatPercentage);
  
  // Calculate total fat loss
  const currentFatMass = data.currentWeight * (data.currentBodyFatPercentage / 100);
  const targetFatMass = data.targetWeight * (data.targetBodyFatPercentage / 100);
  const totalFatLossKg = currentFatMass - targetFatMass;
  
  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    dailyDeficit: Math.round(dailyDeficit),
    dailyBudget: Math.round(dailyBudget),
    totalFatLossKg: Math.round(totalFatLossKg * 10) / 10,
    leanBodyMass: Math.round(leanBodyMass * 10) / 10,
    targetLeanBodyMass: Math.round(targetLeanBodyMass * 10) / 10
  };
}

// Validate if the deficit is safe (not more than 1000 kcal/day or 25% of TDEE)
export function isDeficitSafe(tdee: number, deficit: number): boolean {
  const maxDeficit = Math.min(1000, tdee * 0.25);
  return deficit <= maxDeficit;
}

// Calculate macronutrient targets based on calorie budget
export function calculateMacros(dailyBudget: number, leanBodyMass: number): MacroTargets {
  // Protein: 2.2g per kg of lean body mass
  const proteinGrams = leanBodyMass * 2.2;
  const proteinCalories = proteinGrams * 4;
  
  // Fat: 25% of total calories
  const fatCalories = dailyBudget * 0.25;
  const fatGrams = fatCalories / 9;
  
  // Carbs: Remaining calories
  const carbCalories = dailyBudget - proteinCalories - fatCalories;
  const carbGrams = carbCalories / 4;
  
  return {
    protein: Math.round(proteinGrams),
    carbs: Math.round(carbGrams),
    fat: Math.round(fatGrams),
    proteinCalories: Math.round(proteinCalories),
    carbCalories: Math.round(carbCalories),
    fatCalories: Math.round(fatCalories)
  };
}

// Calculate how many calories are left for lunch and dinner after breakfast
export function calculateMealBudgets(dailyBudget: number, breakfastCalories: number = 0): MealBudgets {
  const remainingCalories = dailyBudget - breakfastCalories;
  
  // Split remaining calories between lunch and dinner (40% lunch, 60% dinner)
  const lunchBudget = remainingCalories * 0.4;
  const dinnerBudget = remainingCalories * 0.6;
  
  return {
    breakfast: breakfastCalories,
    lunch: Math.round(lunchBudget),
    dinner: Math.round(dinnerBudget),
    total: dailyBudget,
    remaining: remainingCalories
  };
}

// Calculate progress percentage
export function calculateWeightProgress(currentWeight: number, targetWeight: number, startWeight: number): number {
  const totalWeightLoss = startWeight - targetWeight;
  const currentWeightLoss = startWeight - currentWeight;
  return Math.min(Math.max((currentWeightLoss / totalWeightLoss) * 100, 0), 100);
}

// Calculate body fat category
export function getBodyFatCategory(bodyFatPercentage: number, gender: 'male' | 'female'): string {
  if (gender === 'male') {
    if (bodyFatPercentage < 6) return 'Essential Fat';
    if (bodyFatPercentage < 14) return 'Athletes';
    if (bodyFatPercentage < 18) return 'Fitness';
    if (bodyFatPercentage < 25) return 'Acceptable';
    return 'Obese';
  } else {
    if (bodyFatPercentage < 14) return 'Essential Fat';
    if (bodyFatPercentage < 21) return 'Athletes';
    if (bodyFatPercentage < 25) return 'Fitness';
    if (bodyFatPercentage < 32) return 'Acceptable';
    return 'Obese';
  }
}

// Get InBody score category
export function getInBodyScoreCategory(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 60) return 'Fair';
  return 'Needs Improvement';
}

// Calculate days elapsed
export function getDaysElapsed(startDate: Date): number {
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Format number with commas
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}