import { getDB } from ".";

export const saveWorkout = async (workout: Workout) => {
    try {
      const db = await getDB();
  
      await db.runAsync(
        'INSERT OR REPLACE INTO workouts (id, created_at, finished_at) VALUES (?, ?, ?);',
        workout.id,
        workout.createdAt.toISOString(),
        workout.finishedAt?.toISOString() || null
      );
    } catch (error) {
      console.error(error);
    }
  };