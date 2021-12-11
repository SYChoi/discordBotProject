import { getQuery } from "../DBController";
import { User } from "./model";

export async function findById(db, id) {
    const selectQuery = `SELECT * FROM user WHERE id = ${id};`;
    const userFromDB = await getQuery(db, selectQuery);
    if (userFromDB) {
        return new User(userFromDB.id, userFromDB.point, userFromDB.lastLogin);
    }
    return undefined;
}