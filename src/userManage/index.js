const controller = require("./controller");

const USER_MANAGE_COMMANDS = [
    "출석", "출첵", "출석체크", "ㅊㅊ",
    "포인트", "point"
]

async function userManageRoute(message, command, args) {
    switch (command) {
        case "출석":
        case "출첵":
        case "출석체크":
        case "ㅊㅊ":
            return controller.attendanceCheck(message);
        case "포인트":
        case "point":
            return controller.checkPoint(message);
        default:
            throw new Error("지원되지 않는 명령어 입니다.");
    }
}

export {USER_MANAGE_COMMANDS, userManageRoute};