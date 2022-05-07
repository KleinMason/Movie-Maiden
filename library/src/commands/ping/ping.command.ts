import * as Discord from 'discord.js';
import { ILogService, LogService } from '../../services/log.service';
import { ICommand } from "../command";

export class PingCommand implements ICommand {
    get name(): string { return "ping" }
    
    get description(): string { return "Pings your pong."}

    logService: ILogService = new LogService();

    run = (message: Discord.Message): void => {
        this.logService.logCommand(this.name);
        message.channel.send('I ping your pong!');
    }
}