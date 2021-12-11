import { connectDB } from "../DBController";
import { findById } from "../user/controller";
import { generateLottoNums } from "./lotto/controller";
import { findBank } from "./bank/controller";

const lottoPrice = 100;

export async function buyLotto(message, num) {
    const db = await connectDB();
    const user = await findById(db, message.author.id);
    const ownedLotto = user.getLotto;
    if (ownedLotto.length > 5) {
        message.reply("로또는 1주일에 최대 5개만 살 수 있습니다. 다음주에 추가로 구매해주세요!!");
        return;
    } else if (ownedLotto.length + num > 5) {
        num = 5 - ownedLotto.length;
        message.reply(`로또는 1주일에 5개까지 살 수 있습니다. 구매 가능한 ${num}개만 추가로 구매할게요!`);
    }

    const bank = await findBank(db);
    for(let i = 0; i < num; i++) {
        const lotto = generateLottoNums();
        const point = user.getPoint() - lottoPrice;

        if (point < 0) {
            message.reply(`보유 포인트가 모자랍니다. ${i}개만 구매하겠습니다.`);
            break;
        }

        await user.addLotto(lotto);
        await user.setPoint(db, -1 * lottoPrice);

        const totalPoints = bank.getTotalPoints() + lottoPrice;
        await bank.setTotalPoint(db, totalPoints);
    }

    message.reply(`로또 구매 완료했습니다! 현재 보유하신 로또는 총 ${user.getLotto.length}개 입니다.`);
}

export async function checkLotto(message) {
    const db = await connectDB();
}