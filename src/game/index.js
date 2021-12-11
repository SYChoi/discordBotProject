import { buyLotto, checkLotto } from './controller';

const GAME_COMMANDS = [
    "lotto", "로또"
];

async function gameRoute(message, command, args) {
    switch (command) {
        case "lotto":
        case "로또":
            switch (args[0]) {
                case "구매":
                    const num = args[1] ?? 1;
                    buyLotto(message, num);
                    break;
                case "확인":
                    checkLotto(message);
                    break;
                default:
                    throw new Error("지원되지 않는 명령어 입니다.");
            }
            break;
        default:
            throw new Error("지원되지 않는 명령어 입니다.");
    }
}

export {GAME_COMMANDS, gameRoute};