import { DbExerciseSet } from "@/types/db"
import { getDB } from "."
import { parseSet } from "./utils"

export const saveSet = async (exerciseSet: ExerciseSet) => {
    try {
        const db = await getDB()
        if (!db) return
        await db.runAsync(
            "INSERT OR REPLACE INTO sets (id, exercise_id, reps, weight, one_rm) VALUES (?, ?, ?, ?, ?)",
            exerciseSet.id,
            exerciseSet.exerciseId,
            exerciseSet.reps || null,
            exerciseSet.weight || null,
            exerciseSet.oneRM || null
        )

    } catch (error) {
        console.error(error)
    }
}

export const getSets = async (exerciseId: string) => {
    try {
        const db = await getDB()
        if (!db) return []
        const sets = await db.getAllAsync<DbExerciseSet>(
            "SELECT * FROM sets WHERE exercise_id = ?",
            exerciseId
        )
        console.log(sets)
        return sets.map(parseSet)
    } catch (error) {
        console.error(error)
        return []
    }
}

export const deleteSet = async (setId: string) => {
    try {
        const db = await getDB()
        if (!db) return
        await db.runAsync("DELETE FROM sets WHERE id = ?", setId)
    } catch (error) {
        console.error(error)
    }
}