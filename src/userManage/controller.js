import { connectDB, runQuery } from "../DBController";
import { User } from "../user/model";
import { findById } from "../user/controller";

const loginReward = 1000;
const today = new Date();

export async function attendanceCheck (message) {
    const db = await connectDB();
    const id = message.author.id;
    const user = await findById(db, id);
    if (!user) {
        const newUser = new User(id, loginReward, today.getTime());
        const insertSQL = `INSERT INTO user(id, point, lastLogin) VALUES (${id}, ${loginReward}, ${today.getTime()})`;
        await runQuery(db, insertSQL);
        db.close();
        message.reply(
            "첫 출석체크 축하드립니다~!!\n" +
            `오늘(${dateString(today)})의 출석체크 완료(보유 point: ${newUser.getPoint()}pts)`
        );
        return;
    }

    const lastLogin = new Date(user.getLastLogin());
    if (dateString(lastLogin) === dateString(today)) {
        message.reply("오늘은 이미 출석체크를 하셨습니다. 내일도 출석체크 해주세요~!!");
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
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
}