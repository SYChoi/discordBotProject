require("dotenv").config();
const Discord = require("discord.js");
const { USER_MANAGE_COMMANDS, userManageRoute } = require("./userManage/index.js");

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

    const commandBody = message.content.slice(PREFIX.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        message.reply("pong!");
    } else if (USER_MANAGE_COMMANDS.includes(command)) {
        await userManageRoute(message, command, args);
    }
});

client.login(process.env.BOT_TOKEN);