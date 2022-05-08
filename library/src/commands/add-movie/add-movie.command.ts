import * as Discord from 'discord.js';
import { ILogService, LogService } from '../../services/log.service';
import { ICommand } from "../command";
import { IMovie, Movie } from '../../models/movie.model';
import { IHttpService, HttpService } from '../../services/http.service';
import { EmbedService, IEmbedService } from '../../services/embed.service';

export class AddMovieCommand implements ICommand {
    get name(): string { return "addmovie" }

    get description(): string { return "Adds a movie to the database." }

    constructor() {
        this.logService = new LogService;
        this.httpService = new HttpService;
        this.embedService = new EmbedService;
    }

    private logService: ILogService;
    private httpService: IHttpService;
    private embedService: IEmbedService;

    run = (message: Discord.Message<boolean>, args: string[], discord?: Discord.Client<boolean>): Promise<void> => {
        this.logService.logCommand(this.name);
        let movie: IMovie = new Movie();
        movie.name = args.join(' ');
        return this.httpService.postMovie(movie)
            .then(_ => {
                let embed = this.embedService.addMovieEmbed(movie.name)
                message.channel.send({embeds: [embed]})
            })
            .catch(_ => {
                let embed = this.embedService.addMovieErrorEmbed(movie.name)
                message.channel.send({embeds: [embed]})                
            });
    }
}