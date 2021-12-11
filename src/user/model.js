import { runQuery } from "../DBController";

export class User {
    constructor(id, point = 0, lastLogin = undefined, lotto = []) {
        this.id = id;
        this.point = point;
        this.lastLogin = lastLogin;
        this.lotto = lotto;
    }

    getPoint() {
        return this.point;
    }

    async setPoint(db, point) {
        this.point += point;
        const updateQuery = `update user set point = ${this.point} where id = ${this.id};`;
        await runQuery(db, updateQuery);
    }

    getLastLogin() {
        return this.lastLogin;
    }

    async setLastLogin(db, date) {
        this.lastLogin = date;
        const updateQuery = `update user set lastLogin = ${this.lastLogin} where id = ${this.id};`;
        await runQuery(db, updateQuery);
    }

    async addLotto(db, lotto) {
        this.lotto.push(lotto);
        const updateQuery = `update user set lotto = ${this.lotto} where id = ${this.id};`;
        await runQuery(db, updateQuery);
    }

    getLotto() {
        return this.lotto;
    }
}