type Workout = {
    id: string;
    createdAt: Date | string;
    finishedAt: Date | null | string;
}

type Exercise = {
    id: string;
    workoutId: string;
    name: string;
}

type ExerciseSet = {
    id: string;
    exerciseId: string;
    reps?: number;
    weight?: number | null;
    oneRM?: number | null
}

 type WorkoutWithExercises = Workout & {
    exercises: ExerciseWithSets[];
  };
  
   type ExerciseWithSets = Exercise & {
    sets: ExerciseSet[];
  };