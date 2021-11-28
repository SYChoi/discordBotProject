import { runQuery } from "../DBController";

export class User {
    constructor(id, point = 0, lastLogin = undefined) {
        this.id = id;
        this.point = point;
        this.lastLogin = lastLogin;
    }

    getPoint() {
        return this.point;
    }

    async setPoint(db, point) {
        this.point += point;
        const updateQuery = `update user set point = ${this.point} where id = ${id}`;
        await runQuery(db, updateQuery);
    }

    getLastLogin() {
        return this.lastLogin;
    }

    async setLastLogin(db, date) {
        this.lastLogin = date;
        const updateQuery = `update user set point = ${this.lastLogin} where id = ${id}`;
        await runQuery(db, updateQuery);
    }
}