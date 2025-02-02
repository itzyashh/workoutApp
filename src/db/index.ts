import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null

export const dbName = 'workoutDb.db'

const createWorkoutsTableQuery = `
CREATE TABLE IF NOT EXISTS workouts (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL,
    finished_at TEXT
);
`
const createExercisesTableQuery = `
CREATE TABLE IF NOT EXISTS exercises (
    id TEXT PRIMARY KEY,
    workout_id TEXT NOT NULL,
    name TEXT NOT NULL,
    FOREIGN KEY (workout_id) REFERENCES workouts(id)
);
`

export const getDB = async () => {
    if (db) return db

    db = await SQLite.openDatabaseAsync(dbName)

    await db.withTransactionAsync(async () => {
        if (!db) return
        await db?.execAsync(createWorkoutsTableQuery)
        await db?.execAsync(createExercisesTableQuery)
    })
    return db

}