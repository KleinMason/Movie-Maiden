import * as Discord from 'discord.js';
import { ILogService, LogService } from '../../services/log.service';
import { ICommand } from "../command";
import { IMovie, Movie } from '../../models/movie.model';
import { IHttpService, HttpService } from '../../services/http.service';

export class AddMovieCommand implements ICommand {
    get name(): string { return "addmovie" }

    get description(): string { return "Adds a movie to the database." }

    constructor() {
        this.logService = new LogService;
        this.httpService = new HttpService;
    }

    private logService: ILogService;
    private httpService: IHttpService;

    run = (message: Discord.Message<boolean>, args: string[], discord?: Discord.Client<boolean>): Promise<void> => {
        console.log(args)
        this.logService.logCommand(this.name);
        let movie: IMovie = new Movie();
        movie.name = args.join(' ');
        return this.httpService.postMovie(movie)
            .then(m => message.channel.send(`I've added ${m.name} to the movie list!`))
            .catch(err => message.channel.send(`I ran into an error while adding ${movie.name} to the movie list. It's likely this movie is already in the movie list. If ${movie.name} is not in the movie list, tell Mason he's dumb and has a bug to fix.`));
    }
}