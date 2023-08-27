const { Client, GatewayIntentBits, Partials, ActivityType } = require('discord.js');
const bot = new Client({
    intents: [
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
        ]
    });
const prompt = require('prompt-sync')();
const Discord = require("discord.js")
const tokenfile = require("./tokenfile.json");
const botconfig = require("./botconfig.json");
var weather = require('weather-js');
const superagent = require('superagent');
const randomPuppy = require('random-puppy');








const fs = require("fs");
const ms = require("ms");
const { error } = require("console");
const { attachCookies } = require("superagent");






//////////////////////////////////////////////////////////
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

bot.categories = fs.readdirSync("./commands/");

["commands"].forEach(handler => {
    require(`./handlers/${handler}`)(bot)
});

bot.on("message", async message => {
    let prefix = botconfig.prefix;

    if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.member) message.member = await message.guild.fetchMember(message)

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd.length === 0) return;

    let command = bot.commands.get(cmd);
    if(!command) command = bot.commands.get(bot.aliases.get(cmd));

    if(command)
    command.run(bot, message, args);
});

//////////////////////////////////////////////////////////////////////////////////////


let botname = "Gamer Bot"

bot.on("ready", () => {
    // Playing in my support server
    bot.user.setActivity('Made by Botika', { type: ActivityType.Streaming});
})

bot.on("message", async message => {
    let MessageArray = message.content.split(" ");
    let cmd = MessageArray[0];
    let args = MessageArray.slice(1);
    let prefix = botconfig.prefix;

    if(message.content.startsWith('!!btc')){
        const CoinGecko = require('coingecko-api');
        const CoinGeckobot = new CoinGecko();
        let data = await CoinGeckobot.simple.price({
            ids: ['bitcoin'],
            vs_currencies: ['huf', 'usd'],
        });                                                                                     
        let btcEmbed = new Discord.MessageEmbed()
        .setDescription(`Bitcoin Árfolyam`)
        .setColor("#ff1800")
        .setFooter(bot.user.username)
        .addField("Bitcoin jelenlegi árfolyama: " + data.data.bitcoin.huf + " HUF ")
        .addField("Bitcoin jelenlegi árfolyama: " + data.data.bitcoin.usd + " USD ")
        .setThumbnail("https://cdn.discordapp.com/attachments/720055841390198815/884817291114610748/bitcoin-icon-6219383_1280.png")

        message.channel.send(btcEmbed);
        
    }


    if(message.content.startsWith('prefix')){
                                                                                    
        let btc2Embed = new Discord.MessageEmbed()
        .setDescription(`Prefixem: !!`)
        .setColor("#ff1800")
        .setFooter(bot.user.username)

        message.channel.send(btc2Embed);
        
    }

})




bot.login(tokenfile.token);