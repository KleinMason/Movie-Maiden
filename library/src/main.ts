import * as Discord from 'discord.js';
import { ConfigModel, IConfigModel } from './models/config.model';
import { PingCommand } from './commands/ping/ping.command';
import { ICommand } from './commands/command';
import { TestCommand } from './commands/test/test.command';

const commands: ICommand[] = [
    new PingCommand(),
    new TestCommand()
]

const config: IConfigModel = new ConfigModel();
const prefix = config.prefix;

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.once('ready', () => {
    console.log('Movie Maiden is online!');
});

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    let cmd = commands.find(c => c.name == command);

    cmd.run(message, args, client);
});

client.login(config.token);