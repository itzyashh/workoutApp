import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const dbName = 'workoutTracker.db'

const createWorkoutTableQuery = `
  CREATE TABLE IF NOT EXISTS workouts (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL
    finished_at TEXT
  );
`;

export const createExercisesTableQuery = `
  CREATE TABLE IF NOT EXISTS exercises (
    id TEXT PRIMARY KEY, 
    workout_id TEXT, 
    name TEXT, 
    FOREIGN KEY (workout_id) REFERENCES workouts (id)
  );`;

  export const getDB = async (): Promise<SQLite.SQLiteDatabase> => {
    if (db) return db;
  
    db = await SQLite.openDatabaseAsync('workoutTracker.db');
    
    await db.execAsync(createWorkoutsTableQuery);
    await db.execAsync(createExercisesTableQuery); // <- add this
  
    return db;
  };

  export const saveExercise = async (exercise: Exercise) => {
    try {
      const db = await getDB();
      await db.runAsync(
        'INSERT INTO exercises (id, workout_id, name) VALUES (?, ?, ?);',
        exercise.id,
        exercise.workoutId,
        exercise.name
      );
    } catch (error) {
      console.error(error);
    }
  };

  const parseExercise = (exercise: DbExercise): Exercise => {
    return {
      id: exercise.id,
      workoutId: exercise.workout_id,
      name: exercise.name,
    };
  };
  
  export const getExercises = async (workout_id: string): Promise<Exercise[]> => {
    try {
      const db = await getDB();
      const exercises = await db.getAllAsync<DbExercise>(
        'SELECT * FROM exercises WHERE workout_id = ?;',
        workout_id
      );
      return exercises.map(parseExercise);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  export const fetchWorkoutExercises = async (
    workout: Workout
  ): Promise<WorkoutWithExercises> => {
    const exercises = await getExercises(workout.id);
  
    return {
      ...workout,
      exercises: exercises,
    };
  };

  export const deleteExercise = async (id: string) => {
    try {
      const db = await getDB();
      await db.runAsync('DELETE FROM exercises WHERE id = ?;', id);
    } catch (error) {
      console.error(error);
    }
  };