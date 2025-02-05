import { DbExercise } from "@/types/db"
import { getDB } from "."
import { parseExercise } from "./utils"

export const saveExercise = async (exercise: Exercise) => {
    try {
        const db = await getDB()  
        db.runAsync('INSERT OR REPLACE INTO exercises (id, workout_id, name) VALUES (?, ?, ?)',
            exercise.id,
            exercise.workoutId,
            exercise.name
        )
    } catch (error) {
        console.error(error)
        return null
    }
}

export const getExercises = async (workoutId: string): Promise<Exercise[] | null> => {
    try {
        const db = await getDB()
        const exercises = await db.getAllAsync<DbExercise>(`
            SELECT * FROM exercises
            WHERE workout_id = ?`
            , workoutId) // replace this with workout_id if it's not working
        if (!exercises) return []
        return exercises.map(parseExercise)
    } catch (error) {
        console.error(error)
        return []
    }
}
        
export const deleteExercise = async (exerciseId: string) => {
    try {
        const db = await getDB()
        db.runAsync('DELETE FROM exercises WHERE id = ?', exerciseId)
    } catch (error) {
        console.error(error)
    }
}