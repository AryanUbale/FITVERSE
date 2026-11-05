import db from "./exerciseDatabase.json";

export const pilatesExercises = db.exercises.filter((e) => e.category === "pilates");
