# FitVerse – 3D Performance

A responsive desktop fitness web application engineered with real-time 3D biomechanical visualizations, unified exercise telemetry, and a futuristic dark navy UI design system.

---

## 🎨 Design System & Architecture

- **Color Palette**:
  - Page Background: Deep Navy `#14132B`
  - Card Surfaces: Deep Indigo Surface `#1E1D3A`
  - Primary Accent: Electric Indigo `#4F5BFF` to `#5B6CFF`
  - Accent Palette: Cyan `#4DD0E1`, Purple `#6C3CE0`, Coral `#FF5C5C`, Green `#2ED8A3`, Soft Blue `#5B7CFA`
- **Typography**: Montserrat (400, 500, 600, 700, 800)
- **Radii**: 24px–32px on cards, 16px on buttons and chips
- **Glassmorphism**: Glass stat pills, subtle translucent borders (`rgba(255,255,255,0.06)`), and responsive hover lift with colored glows

---

## 🗄️ Database Integration

The exercise data is consolidated from the master Excel workbook `FormFit3D_Exercise_Database.xlsx`, providing:
- **33 Exercises** across Gym, Home, and Pilates disciplines with biomechanical execution steps, target/secondary muscles, posture cues, safety tips, and alternatives
- **10 Workout Plans & Multi-Week Schedules**
- Single authoritative JSON database (`src/data/exerciseDatabase.json`) with backwards-compatible modules (`gymExercises.js`, `homeExercises.js`, `pilatesExercises.js`, `workoutPlans.js`)

---

## 🚀 Key Modules & Components

1. **Top Bar**: Search bar, discipline switchers (Gym / Home / Pilates), active streak pill, and Start Workout trigger.
2. **Fixed Sidebar (260px)**: FitVerse brand identity, discipline switcher grid, navigation items with indigo active pills, and user profile card.
3. **Stat Tiles**: 4 responsive solid color blocks (Total Sessions, Training Duration, Active Streak, Exercises Done).
4. **3D Fitness Companion (8 cols)**: Interactive Three.js/R3F human anatomical model with hover-only muscle highlighting, Front/Back/Side camera toggles, and saturated radial indigo background glow.
5. **Today's Workout (4 cols)**: Gradient card with cutout athlete, duration and volume pills, exercise checklist, and glowing Start Workout CTA.
6. **Top Trainings Hero & Category Tiles**: Hero functional conditioning card with cutout athlete beside icon category selector (Running, Cycling, Walking, Yoga, Strength).
7. **Curated Workouts Row**: 3 themed cards (Weight Loss Training, Cardio Training, Belly Fat Loose Training) with cutout athletes and stats.
8. **Activity Progress Ring**: Circular animated progress ring (80%), week date selector with dynamic report tiles (Kcal Burnt, Heart Rate, Steps, Workout Duration).
9. **Recommended Classes**: Horizontal class cards with instructor and calorie telemetry.
10. **Collapsible Right Panel (320px)**: Daily goals (jogging route tracker, remaining distance) and Core Blast trainer selector.
11. **Split-Screen Onboarding**: Blue mindfulness panel with athlete cutout and selectable favorite workout category chip grid.

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the port displayed in terminal) in your browser.

### 3. Production Build & Verification
```bash
npm run build
npm run preview
```
