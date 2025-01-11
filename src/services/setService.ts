import * as Crypto from 'expo-crypto';

export const createSet = (exerciseId: string) => {
    const newSet : ExerciseSet = {
        id: Crypto.randomUUID(),
        exerciseId,
    }
    return newSet
}

export const updateSet = (set: ExerciseSet, newChanges: Pick<ExerciseSet, 'reps' | 'weight'>) => {

    const updatedSet = {...set}

    if (newChanges.reps !== undefined) updatedSet.reps = newChanges.reps
    if (newChanges.weight !== undefined) updatedSet.weight = newChanges.weight
    if (newChanges.reps !== undefined && newChanges.weight !== undefined && newChanges.weight !== null) {
        console.log('updatedSet.oneRM', updatedSet.oneRM)
        updatedSet.oneRM = (100 * newChanges.weight) / (101.3 - 2.67123 * newChanges.reps)
    } 

    console.log('updatedSet', updatedSet)

    return updatedSet
}