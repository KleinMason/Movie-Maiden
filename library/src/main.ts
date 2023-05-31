import * as Discord from 'discord.js';
import { ConfigService } from './services/config.service';
import { PingCommand } from './commands/ping/ping.command';
import { ICommand } from './commands/command';
import { TestCommand } from './commands/test/test.command';
import { AddMovieCommand } from './commands/add-movie/add-movie.command';

const commands: ICommand[] = [
    new PingCommand(),
    new TestCommand(),
    new AddMovieCommand()
]

const configService: ConfigService = new ConfigService();
const prefix = configService.prefix;

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.once('ready', () => {
    console.log('Movie Maiden is online!');
    client.user.setActivity('Just Chatting', {type: 'STREAMING', url: 'https://www.twitch.tv/r'})
});

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    let cmd = commands.find(c => c.name == command);
    if (!cmd) return;

    cmd.run(message, args, client);
});

client.login(configService.token);
