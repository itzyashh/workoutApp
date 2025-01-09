import {create} from 'zustand'
import { v4 as uuidv4 } from 'uuid';
import { finishWorkout, newWorkout } from '@/services/workoutServices';


type State = {
    currentWorkout: WorkoutWithExercises | null
    workouts: WorkoutWithExercises[]
}

type Actions = {
    startWorkout: () => void
    finishWorkout: () => void
}

export const useWorkoutStore = create<State & Actions>((set, get) => ({
    currentWorkout: null,
    workouts: [],
    startWorkout: () => set({currentWorkout: newWorkout()}),
    

    finishWorkout: () => {
        const workout = get().currentWorkout
        if (workout) {
            const updatedWorkout = finishWorkout(workout)
            set({currentWorkout: null})
            set((state) => ({workouts: [updatedWorkout, ...state.workouts]}))
        }
    }

}))