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

export const getDB = async () => {
    if (db) return db

    db = await SQLite.openDatabaseAsync(dbName)

    await db.execAsync(createWorkoutsTableQuery)

    return db

}