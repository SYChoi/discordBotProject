require("dotenv").config();
const Discord = require("discord.js");
import { USER_MANAGE_COMMANDS, userManageRoute } from "./userManage/index.js";
import { GAME_COMMANDS, gameRoute } from "./game/index.js";

const PREFIX = "!!";

const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
    ],
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

client.on("messageCreate", async function(message) {
    console.log(message.content);
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;

    const { command, args } = parseCommand(message);

    if (command === "ping") {
        await message.reply("pong!");
    } else if (command === "명령어") {
        const commands = [
            "명령어",
            "ping",
            ...USER_MANAGE_COMMANDS,
            ...GAME_COMMANDS,
        ];
        const commandMessages = getCommandMessages(commands);
        await message.reply(commandMessages);
    } else if (USER_MANAGE_COMMANDS.includes(command)) {
        await userManageRoute(message, command, args);
    } else if (GAME_COMMANDS.includes(command)) {
        await gameRoute(message, command, args);
    }
});

client.login(process.env.BOT_TOKEN);

function parseCommand(message) {
    const commandBody = message.content.slice(PREFIX.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();
    return { command, args };
}

function getCommandMessages(commands) {
    const commandMessagePreset = {
        "명령어": "명령어: 명령어 목록 출력",
        "ping": "ping: 연결 확인(pong)",
        "출석체크": "출석체크, 출첵, 출석, ㅊㅊ: 출석을 체크해줍니다.",
        "포인트": "포인트, point: 포인트 보유량을 알려줍니다.",
        "로또": "로또, lotto: 로또 관련 명령어 \n" + 
            "\t*-구매: 로또를 구매합니다.(1주 최대 5개 자동만 구매 가능)\n" +
            "\t*-확인: 로또 당첨 번호 확인 및 당첨 포인트 수령",
        "강화": "강화: 단어 강화 관련 명령어 \n" +
            "\t*-등록: 해당 단어를 강화용 아이템으로 등록합니다.\n" +
            "\t*-강화: 해당 단어를 포인트를 사용하여 강화합니다.",
    }
    return commands.map(command => commandMessagePreset[command])
        .filter(commandMessage => !!commandMessage)
        .reduce((result, command) => {
          result = result + '\n' + command
          return result;
        });
}
