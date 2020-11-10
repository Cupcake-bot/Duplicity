const Discord = require(`discord.js`);

const client = new Discord.Client();

const prefix = `dp!`;

const fs = require(`fs`);
// this is the command handler, all commands are stored in the Commands folder, this tells the bot to only check .js files in that folder.
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync(`./Commands/`).filter(file => file.endsWith(`.js`));
for(const file of commandFiles){
    const command = require(`./Commands/${file}`);

    client.commands.set(command.name, command);
}
//block below makes sure that bots won't trigger the rest of the main file, and it won't check messages without the bot prefix.
client.on (`message` , message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);

    const command = args.shift().toLowerCase();
//checks message for valid command name.
    if(!client.commands.has(command)) return;
    try{
        client.commands.get(command).execute(message, args);
    } catch(error){
        console.error(error);
        message.reply(`I'm sorry, but the great and powerful Marmalade has not yet gifted me with enough brain to comprehend your request`);
    }
})
//gives console feedback that the bot is online.
client.once(`ready`, () => {
    console.log(`Bot online`);
});











client.login(`Nzc0NzcwMjMyMzgzNjM1NDg2.X6cnAQ.FpyRri6S0l0ZC0qLH0omT0EdUuo`);