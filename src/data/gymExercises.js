import db from "./exerciseDatabase.json";

export const gymExercises = db.exercises.filter((e) => e.category === "gym");
