# FITVERSE – Your Personal Fitness Companion

FITVERSE is a fitness and workout management web application designed to help users plan workouts, explore exercises, track fitness progress, and stay consistent with their fitness goals.

The application brings workout planning, exercise guidance, progress tracking, and personalized fitness management together in one platform.

## Features

### 1. Dashboard
- Personalized fitness dashboard.
- Daily fitness goals and activity statistics.
- Recommended workouts.
- Workout summaries and activity indicators.

### 2. Exercise Library
- Browse exercises across different categories.
- View detailed exercise information.
- Explore gym, home, and Pilates exercises.
- Access exercise video previews.
- View 3D exercise visualizations.

### 3. Workout Management
- Explore available workout plans.
- Manage workout routines.
- Track active workout sessions.
- Access virtual trainer guidance.

### 4. Equipment Guide
- Explore fitness equipment and their uses.
- Discover alternative equipment options.
- Find ways to perform exercises with available resources.

### 5. Calendar and Progress Tracking
- View fitness activities through a calendar.
- Monitor workout progress.
- Track achievements and milestones.
- View fitness-related statistics and calculations.

### 6. User Management
- User onboarding.
- Fitness preferences and settings.
- Context-based state management.
- Local storage support for application data.

## Tech Stack

- **Frontend:** React.js
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Charts:** Recharts
- **3D Visualizations:** React Three Fiber / Three.js (where used)
- **Data Storage:** Browser Local Storage

## Project Structure

```text
FITVERSE/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── 3D/
│   │   ├── Dashboard/
│   │   ├── Layout/
│   │   ├── ui/
│   │   └── video/
│   │
│   ├── context/
│   │   └── FitnessContext.jsx
│   │
│   ├── data/
│   │   ├── exerciseDatabase.json
│   │   ├── gymExercises.js
│   │   ├── homeExercises.js
│   │   ├── pilatesExercises.js
│   │   ├── equipmentGuide.js
│   │   ├── equipmentAlternatives.js
│   │   ├── exerciseVideos.js
│   │   ├── workoutPlans.js
│   │   ├── trainerKnowledge.js
│   │   ├── mockTrainingData.js
│   │   └── achievements.js
│   │
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Onboarding.jsx
│   │   ├── ExerciseLibrary.jsx
│   │   ├── ExerciseDetails.jsx
│   │   ├── EquipmentGuidePage.jsx
│   │   ├── EquipmentAlternativesPage.jsx
│   │   ├── WorkoutPlans.jsx
│   │   ├── ActiveWorkoutSession.jsx
│   │   ├── VirtualTrainerPage.jsx
│   │   ├── CalendarPage.jsx
│   │   ├── ProgressPage.jsx
│   │   ├── Achievements.jsx
│   │   └── Settings.jsx
│   │
│   ├── styles/
│   │   └── index.css
│   │
│   ├── utils/
│   │   ├── calculations.js
│   │   └── storage.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/AryanUbale/FITVERSE.git
```

2. Navigate to the project directory:

```bash
cd FITVERSE
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL displayed in your terminal (usually `http://localhost:3000/`).

## Running a Production Build

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Team Contributions

FITVERSE was developed collaboratively by a team of five members, with responsibilities distributed across the user interface, exercise library, workout management, progress tracking, and application integration.

## Future Enhancements

- Integration with wearable fitness devices.
- More personalized workout recommendations.
- Enhanced fitness analytics.
- Expanded exercise and equipment database.
- Improved workout personalization and tracking.

---

**FITVERSE – Train Smarter. Stay Consistent. Get Stronger.**
