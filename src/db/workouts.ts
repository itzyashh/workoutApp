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

  export const getCurrentWorkout = async (): Promise<Workout | null> => {
    try {
      const db = await getDB();
      const workout = await db.getFirstAsync<DbWorkout>(
        `SELECT * FROM workouts 
        WHERE finished_at IS NULL 
        ORDER BY created_at DESC 
        LIMIT 1`
      );
      if (!workout) {
        return null;
      }
      return parseWorkout(workout);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const parseWorkout = (workout: DbWorkout): Workout => {
    return {
      id: workout.id,
      createdAt: new Date(workout.created_at),
      finishedAt: workout.finished_at ? new Date(workout.finished_at) : null,
    };
  };