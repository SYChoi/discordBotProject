const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

export async function connectDB() {
    const db = new sqlite3.Database('./db.sqlite3', (err) => {
        if (err) {
            throw new Error(err);
        }
        console.log("DB connection Succeed");
    });
    await initDB(db);
    return db;
}

async function initDB(db) {
    const initialSQL = fs.readFileSync(__dirname + "/../initializeDB.sql").toString();
    await runQuery(db, initialSQL);
}

export function runQuery(db, query) {
    return new Promise((resolve, reject) => {
        console.log(query);
        db.run(query, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}

export function getQuery(db, query) {
    return new Promise((resolve, reject) => {
        console.log(query);
        db.get(query, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}