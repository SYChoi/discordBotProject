import { Bank } from "./model";
import { getQuery, runQuery } from "../../DBController";

export async function findBank (db) {
    const getBankQuery = "select * from Bank limit 1";
    const bankFromDB = await getQuery(db, getBankQuery);
    // 기존에 있는 경우
    if (bankFromDB) {
        return new Bank(bankFromDB.id, bankFromDB.totalPoints, bankFromDB.lottoOfThisWeek);
    }

    // 없으면 새로 만들어주자
    const bank = new Bank(0);
    const newBankQuery = `insert into bank(id, totalPoints, lottoOfThisWeek) values (${bank.getId()}, ${bank.getTotalPoints()}, ${bank.getLottoOfThisWeek()})`;
    await runQuery(db, newBankQuery);
    return bank;
}