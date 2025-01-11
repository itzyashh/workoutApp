import {create} from 'zustand'
import * as Crypto from 'expo-crypto';
import { createWorkout, finishWorkout } from '@/services/workoutService';
import { createExercise } from '@/services/exerciseService';
import { immer } from 'zustand/middleware/immer'
import { createSet, updateSet } from '@/services/setService';
import { current } from 'immer';

type State = {
    currentWorkout: WorkoutWithExercises | null
    workouts: WorkoutWithExercises[]
}

type Actions = {
    startWorkout: () => void
    finishWorkout: () => void
    addExercise: (name: string) => void
    addSet: (exerciseId: string) => void
    updateSet: (setId: string, newChanges: Pick<ExerciseSet, 'reps' | 'weight'>) => void
}

export const useWorkoutStore = create<State & Actions>()(immer((set, get) => ({
    
    currentWorkout: null,
    workouts: [],


    startWorkout: () => void(set({currentWorkout: createWorkout()})),


    finishWorkout: () => {
        const {currentWorkout} = get()
        if (!currentWorkout) return
        const finishedWorkout: WorkoutWithExercises = finishWorkout(currentWorkout)

        set((state)=> {

            state.currentWorkout = null
            state.workouts.unshift(finishedWorkout)

        })
            
    },

    addExercise: (name: string) => {
        const {currentWorkout} = get()
        if (!currentWorkout) return

       const newExercise = createExercise(currentWorkout.id, name)

       set((state)=>{
        state.currentWorkout && state.currentWorkout.exercises.push(newExercise)
    })
    },

    addSet: (exerciseId: string) => {
        const newSet = createSet(exerciseId)
        set((state)=>{
            const exercise = state.currentWorkout?.exercises.find(e => e.id === exerciseId)
            exercise && exercise.sets.push(newSet)          
        })
    },

    updateSet: (setId, newChanges) => {
        set(({currentWorkout})=>{
            if (!currentWorkout) return
            const exercise = currentWorkout.exercises.find(e => e.sets.some(s => s.id === setId))
            if (!exercise) return
            const setIndex = exercise.sets.findIndex(s => s.id === setId)

            if (setIndex === undefined || setIndex === -1) return

            const updatedSet = updateSet(current(exercise.sets[setIndex]), newChanges)

            exercise.sets[setIndex] = updatedSet

        })
    }


})))
