import {create} from 'zustand'


type State = {
    currentWorkout: WorkoutWithExercises | null
}

type Actions = {
    startWorkout: (workout: WorkoutWithExercises) => void
}

export const useWorkoutStore = create<State & Actions>((set) => ({
    currentWorkout: null,
    startWorkout: () => {
        const newWorkout: WorkoutWithExercises = {
            id: '123',
            createdAt: new Date(),
            finishedAt: null,
            exercises: []
        }
        set({currentWorkout: newWorkout})
    }


}))