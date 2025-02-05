import { deleteSet, saveSet } from '@/db/sets';
import * as Crypto from 'expo-crypto';

export const createSet = (exerciseId: string) => {
    const newSet : ExerciseSet = {
        id: Crypto.randomUUID(),
        exerciseId,
    }
    saveSet(newSet)
    return newSet
}

export const updateSet = (set: ExerciseSet, newChanges: Pick<ExerciseSet, 'reps' | 'weight'>) => {

    const updatedSet = {...set}

    if (newChanges.reps !== undefined) updatedSet.reps = newChanges.reps
    if (newChanges.weight !== undefined) updatedSet.weight = newChanges.weight
    if (updatedSet.reps !== undefined && updatedSet.weight !== undefined && updatedSet.weight !== null) {
        updatedSet.oneRM = (100 * updatedSet.weight) / (101.3 - 2.67123 * updatedSet.reps)
    } 
    saveSet(updatedSet)
    return updatedSet
}

const isSetComplete = (set: ExerciseSet) => {
    return set.reps && set.reps > 0;
  };

export const cleanSets = (sets: ExerciseSet[]) => {

    const completeSets = sets.filter(isSetComplete)
    const incompleteSets = sets.filter(set => !isSetComplete(set))

    incompleteSets.forEach(set => deleteSet(set.id))

    return completeSets
}