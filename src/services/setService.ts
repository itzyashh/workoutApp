import { v4 as uuidv4 } from 'uuid';

export const createSet = (exerciseId: string) => {
    const newSet:ExerciseSet = {
        id: uuidv4(),
        exerciseId
    }
    return newSet
}

export const updateSet = (set: ExerciseSet, updatedFields: Pick<ExerciseSet, 'reps' | 'weight'>) => {
    
    const updatedSet = { ...set }
    
    if (updatedFields.reps !== undefined) {
            updatedSet.reps = updatedFields.reps
        }
        if (updatedFields.weight !== undefined) {
            updatedSet.weight = updatedFields.weight
        }
        return updatedSet
}