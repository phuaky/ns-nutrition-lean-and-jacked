# NS Nutrition Lean & Jacked - Project Documentation

## Overview
A mobile-first web application that helps users track their nutrition intake based on InBody measurements and catered meal options. The app calculates daily calorie budgets to help users reach their body composition goals.

## Core Features

### 1. InBody Data Input
- Users input their InBody scan results including:
  - Current weight and body fat percentage
  - Target weight and body fat percentage
  - Other metrics (BMI, SMM, etc.)

### 2. Goal Setting
- Users specify timeline (number of days) to reach target
- App calculates required daily calorie deficit

### 3. Meal Planning
- Display available lunch and dinner options
- Show nutritional values (calories, protein, carbs, fat)
- Recommend meals within daily calorie budget

### 4. Progress Tracking
- Track daily intake vs. budget
- Visualize progress towards goal

## Technical Implementation

### Data Structure
- Nutrition data stored as JSON
- Meal options organized by day of week
- Each meal includes full macro breakdown

### Calculations

#### BMR (Basal Metabolic Rate)
Using Mifflin-St Jeor equation with lean body mass adjustment:
- Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5
- Women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161

#### TDEE (Total Daily Energy Expenditure)
TDEE = BMR × Activity Factor (1.2-1.9)

#### Daily Calorie Deficit
- Calculate total fat loss needed: Current BF% - Target BF%
- Convert to kg: (fat loss % × current weight) / 100
- Total calorie deficit needed: fat kg × 7,700 kcal
- Daily deficit: Total deficit / days to goal

#### Daily Calorie Budget
Daily Budget = TDEE - Daily Deficit

### UI/UX Design Principles
- Mobile-first responsive design
- Clear data visualization
- Easy meal selection interface
- Progress indicators

## Development Commands
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run lint    # Run linter
npm run preview # Preview production build
```

## File Structure
- `/client/src/lib/nutrition-data.ts` - Parsed meal nutrition data
- `/client/src/lib/calculations.ts` - BMR, TDEE, deficit calculations
- `/client/src/components/` - React components
- `/client/src/pages/` - Page components

## Testing
- Test all calculation functions with sample InBody data
- Verify meal recommendations stay within calorie budget
- Ensure mobile responsiveness

## Future Enhancements
- Add breakfast and cafe items tracking
- Export meal plans
- Historical progress charts
- Social sharing features