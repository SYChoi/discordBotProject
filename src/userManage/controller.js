import { connectDB, runQuery } from "../DBController";
import { User } from "../user/model";
import { findById } from "../user/controller";
import { DateTime } from "luxon";

const loginReward = 1000;

export async function attendanceCheck (message) {
    const db = await connectDB();
    const id = message.author.id;
    const user = await findById(db, id);
    const today = DateTime.local();
    if (!user) {
        const newUser = new User(id, loginReward, today.toMillis());
        const insertSQL = `INSERT INTO user(id, point, lastLogin) VALUES (${id}, ${loginReward}, ${today.toMillis()})`;
        await runQuery(db, insertSQL);
        db.close();
        message.reply(
            "첫 출석체크 축하드립니다~!!\n" +
            `오늘(${dateString(today)})의 출석체크 완료(보유 point: ${newUser.getPoint()}pts)`
        );
        return;
    }

    const lastLogin = DateTime.fromMillis(user.getLastLogin());
    if (dateString(lastLogin) === dateString(today)) {
        message.reply(`오늘(${dateString(today)})은 이미 출석체크를 하셨습니다. 내일도 출석체크 해주세요~!!`);
        db.close();
        return;
    } else {
        await user.setLastLogin(db, today.getTime());
        await user.setPoint(db, loginReward);
        message.reply(`오늘(${dateString(today)})의 출석체크 완료(보유 point: ${user.getPoint()}pts)`);
        db.close();
        return;
    }
}

function dateString(date) {
    return date.toFormat("yyyy년 MM월 dd일")
}

export async function checkPoint (message) {
    const db = await connectDB();
    const id = message.author.id;
    const user = await findById(db, id);

    const point = user.getPoint();
    message.reply(`현재 보유하신 포인트는 ${point}pts 입니다.`);
    db.close();
    return;
}