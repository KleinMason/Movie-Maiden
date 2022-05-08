import * as Discord from 'discord.js';

export interface IEmbedService {
    addMovieEmbed: (movieName: string) => Discord.MessageEmbed;
    addMovieErrorEmbed: (movieName: string) => Discord.MessageEmbed;
}

export class EmbedService implements IEmbedService {
    private embedSuccessColor: Discord.ColorResolvable = 'GREEN';
    private embedErrorColor: Discord.ColorResolvable = 'RED';
    private footerData: Discord.EmbedFooterData = {
        text: 'Movie Maiden v1.0.0-beta1',
        iconURL: 'https://i.imgur.com/pVUcaSa.jpg' // TODO: get version from parent package.json
    }

    addMovieEmbed = (movieName: string): Discord.MessageEmbed => {
        return new Discord.MessageEmbed()
            .setColor(this.embedSuccessColor)
            .setTitle('Add Movie')
            .setFields({ name: 'Success!', value: `I've added ${movieName} to the movie list.` })
            .setFooter(this.footerData)
    };

    addMovieErrorEmbed = (movieName: string): Discord.MessageEmbed => {
        return new Discord.MessageEmbed()
            .setColor(this.embedErrorColor)
            .setTitle('Add Movie')
            .setFields({ name: 'Error!', value: `I can't seem to add ${movieName} to the movie list; it may already be in the list. If ${movieName} is not in the movie list, tell Mason he's dumb and has a bug to fix.` })
            .setFooter(this.footerData)
    };
}