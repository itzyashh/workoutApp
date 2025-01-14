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
    if (updatedSet.reps !== undefined && updatedSet.weight !== undefined && updatedSet.weight !== null) {
        updatedSet.oneRM = (100 * updatedSet.weight) / (101.3 - 2.67123 * updatedSet.reps)
    } 
    return updatedSet
}

const isSetComplete = (set: ExerciseSet) => {
    return set.reps && set.reps > 0;
  };

export const cleanSets = (sets: ExerciseSet[]) => {
    return sets.filter(isSetComplete)
}