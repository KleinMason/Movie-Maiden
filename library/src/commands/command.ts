import * as Discord from 'discord.js';

export interface ICommand {
    name: string;
    description: string;
    run: (message: Discord.Message, args: string[], discord?: Discord.Client) => void;
}