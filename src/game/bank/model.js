import { runQuery } from "../../DBController";

export class Bank {
    constructor(id, totalPoints, lottoOfThisWeek = undefined) {
        this.id = id;
        this.totalPoints = totalPoints;
        this.lottoOfThisWeek = lottoOfThisWeek;
    }

    getId() {
        return this.id;
    }

    getLottoOfThisWeek() {
        return this.lottoOfThisWeek;
    }

    async setLottoOfThisWeek(db, lottoOfThisWeek) {
        this.lottoOfThisWeek = lottoOfThisWeek;
        const updateQuery = `update bank set lottoOfThisWeek = ${this.lottoOfThisWeek} where id = ${this.id};`;
        await runQuery(db, updateQuery);
    }

    getTotalPoints() {
        return this.totalPoints;
    }

    async setTotalPoints(db, totalPoints) {
        this.totalPoints = totalPoints;
        const updateQuery = `update bank set totalPoints = ${this.totalPoints} where id = ${this.id};`;
        await runQuery(db, updateQuery);
    }
}