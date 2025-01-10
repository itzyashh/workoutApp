import { create, StateCreator } from 'zustand'
import { v4 as uuidv4 } from 'uuid';
import { finishWorkout, newWorkout } from '@/services/workoutService';
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
    updateSet: (setId: string, updatedFields: Pick<ExerciseSet, 'reps' | 'weight'>) => void
}

export const useWorkoutStore = create<State & Actions>()(
    immer<State & Actions>((set, get) => ({
        currentWorkout: null,
        workouts: [],
        startWorkout: () => set({ currentWorkout: newWorkout() }),


        finishWorkout: () => {
            const workout = get().currentWorkout
            if (workout) {
                const updatedWorkout = finishWorkout(workout)
                set({ currentWorkout: null })
                set((state) => void (state.workouts.unshift(updatedWorkout)))
            }
        },

        addExercise: (name) => {
            const { currentWorkout } = get()
            if (!currentWorkout) return
            const newExercise = createExercise(name, currentWorkout.id)
            currentWorkout.exercises.push(newExercise)
            set({ currentWorkout })
        },

        addSet: (exerciseId) => {
            set(({ currentWorkout }) => {
                if (!currentWorkout) return
                const exercise = currentWorkout.exercises.find((e) => e.id === exerciseId)
                if (!exercise) return
                const newSet = createSet(exercise.id)
                exercise.sets.push(newSet)
            })
        },

        updateSet: (setId, updatedFields) => {
            set(({ currentWorkout }) => {
                if (!currentWorkout) return
                let exercise = currentWorkout.exercises.find((e) => e.sets.find((s) => s.id === setId))
                if (!exercise) return
                let set = exercise.sets.find((s) => s.id === setId)
                if (!set) return
                set = updateSet(set, updatedFields)
            })
        }
    }))
)

