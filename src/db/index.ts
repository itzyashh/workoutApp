import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null

export const dbName = 'workoutDb.db'

export const getDB = async () => {
    if (db) return db

    db = await SQLite.openDatabaseAsync(dbName)
    return db

}