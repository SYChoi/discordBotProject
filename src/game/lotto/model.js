export const numOfLotto = 6;

export class Lotto {
    constructor(id, owner, numbers = [], bonus) {
        this.id = id;
        this.owner = owner;
        this.numbers = numbers;
        this.bonus = bonus;
    }

    getId() {
        return this.id;
    }

    getOwner() {
        return this.owner;
    }

    getNumbers() {
        return this.numbers;
    }

    getBonus() {
        return this.bonus;
    }
}