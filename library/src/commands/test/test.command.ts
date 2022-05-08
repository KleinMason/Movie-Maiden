import * as Discord from 'discord.js';
import { ICommand } from "../command";

export class TestCommand implements ICommand {
    get name(): string { return "test" }
    
    get description(): string { return "test command" };
    
    run = (message: Discord.Message<boolean>, args: string[], discord?: Discord.Client<boolean>): void => {
        const embed = new Discord.MessageEmbed()
            .setColor('WHITE')
            .setTitle('Test')
            .setURL('https://www.google.com')
            .setDescription(`${this.description}`)
            .addFields(
                {name: 'name', value: `${this.name}`},
                {name: 'test #1', value: 'rofl'}
            )
            .setImage('https://www.tacobell.com/_static/web/images/loyalty/side-overlay-2022-E01-Rewards-Doritos-Locos-Tacos-W.png');

            message.channel.send({embeds: [embed]});
    };
}