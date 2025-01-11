import {create} from 'zustand'
import * as Crypto from 'expo-crypto';
import { createWorkout, finishWorkout } from '@/services/workoutService';
import { createExercise } from '@/services/exerciseService';

type State = {
    currentWorkout: WorkoutWithExercises | null
    workouts: WorkoutWithExercises[]
}

type Actions = {
    startWorkout: () => void
    finishWorkout: () => void
    addExercise: (name: string) => void
}

export const useWorkoutStore = create<State & Actions>((set, get) => ({
    
    currentWorkout: null,
    workouts: [],


    startWorkout: () => void(set({currentWorkout: createWorkout()})),


    finishWorkout: () => {
        const {currentWorkout} = get()
        if (!currentWorkout) return
        const finishedWorkout: WorkoutWithExercises = finishWorkout(currentWorkout)

        set((state)=>({currentWorkout: null, workouts: [finishedWorkout, ...state.workouts]}))
    },

    addExercise: (name: string) => {
        const {currentWorkout} = get()
        if (!currentWorkout) return

       const newExercise = createExercise(currentWorkout.id, name)

       set((state)=>({ currentWorkout: state.currentWorkout && {...state.currentWorkout, exercises: [...state.currentWorkout.exercises, newExercise]}}))
    }


}))