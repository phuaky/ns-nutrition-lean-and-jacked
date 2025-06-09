export interface UserData {
  weight: number;
  bodyFat: number;
  targetWeight: number;
  inbodyScore: number;
  bmr: number;
  activityLevel: number;
  timeline: number;
}

export interface CalorieDistribution {
  dailyCalories: number;
  breakfastCalories: number;
  lunchCalories: number;
  dinnerCalories: number;
  remainingCalories: number;
}

export function calculateTDEE(bmr: number, activityLevel: number): number {
  return bmr * activityLevel;
}

export function calculateCalorieDeficit(currentWeight: number, targetWeight: number, timeline: number): number {
  const weightDiff = currentWeight - targetWeight;
  const totalCalorieDeficit = weightDiff * 7700; // 7700 kcal per kg
  return totalCalorieDeficit / timeline;
}

export function calculateDailyCalories(userData: UserData): CalorieDistribution {
  const tdee = calculateTDEE(userData.bmr, userData.activityLevel);
  const dailyDeficit = calculateCalorieDeficit(userData.weight, userData.targetWeight, userData.timeline);
  
  const dailyCalories = Math.round(tdee - dailyDeficit);
  
  // Allocate calories: 25% breakfast (cafe), 40% lunch, 35% dinner
  const breakfastCalories = Math.round(dailyCalories * 0.25);
  const lunchCalories = Math.round(dailyCalories * 0.40);
  const dinnerCalories = Math.round(dailyCalories * 0.35);
  const remainingCalories = dailyCalories;

  return {
    dailyCalories,
    breakfastCalories,
    lunchCalories,
    dinnerCalories,
    remainingCalories
  };
}

export function calculateWeightProgress(currentWeight: number, targetWeight: number, startWeight: number): number {
  const totalWeightLoss = startWeight - targetWeight;
  const currentWeightLoss = startWeight - currentWeight;
  return Math.min((currentWeightLoss / totalWeightLoss) * 100, 100);
}

export function calculateTimelineProgress(currentDay: number, totalDays: number): number {
  return Math.min((currentDay / totalDays) * 100, 100);
}

export function estimateBMR(weight: number, height: number, age: number, gender: 'male' | 'female'): number {
  // Using Mifflin-St Jeor Equation
  if (gender === 'male') {
    return (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    return (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }
}

export function categorizeInBodyScore(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 60) return 'Fair';
  return 'Needs Improvement';
}

export function calculateBodyFatCategory(bodyFat: number, gender: 'male' | 'female'): string {
  if (gender === 'male') {
    if (bodyFat < 6) return 'Essential Fat';
    if (bodyFat < 14) return 'Athletes';
    if (bodyFat < 18) return 'Fitness';
    if (bodyFat < 25) return 'Acceptable';
    return 'Obese';
  } else {
    if (bodyFat < 14) return 'Essential Fat';
    if (bodyFat < 21) return 'Athletes';
    if (bodyFat < 25) return 'Fitness';
    if (bodyFat < 32) return 'Acceptable';
    return 'Obese';
  }
}
