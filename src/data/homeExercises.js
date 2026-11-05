import db from "./exerciseDatabase.json";

export const homeExercises = db.exercises.filter((e) => e.category === "home");
