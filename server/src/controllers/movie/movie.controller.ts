/* istanbul ignore file */
import { Request, Response, Application, Router } from "express";
import { appendFile } from "fs";
import { inject, injectable } from "inversify";
import { TYPES } from "../../composition/app.composition.types";
import { RouteError } from "../../models/route-error";
import { IMovieService } from "../../services/movie.service";

@injectable()
export class MovieController {

    private router: Router;

    constructor(
        @inject(TYPES.ExpressApplication) app: Application,
        @inject(TYPES.MovieService) private movieService: IMovieService) {
        this.router = Router();
        this.router
            .get('/all', this.getAllMovies)
            .get('/:movieId', this.getMovie)
            .post('/add', this.addMovie)
            .delete('/:movieId', this.deleteMovie)

        app.use('/api/movie', this.router);
    }

    getAllMovies = (_req: Request, res: Response, next: any) => {
        return this.movieService.getAllMovies()
            .then(movies => res.json({ movies }))
            .catch((ex: Error) => next(new RouteError(ex.message, 500)));
    }

    getMovie = (req: Request, res: Response, next: any) => {
        if (!req.params.movieId) return next(new RouteError("Movie id not provided", 400));
        let movieId = parseInt(req.params.movieId);
        if (isNaN(movieId)) return next(new RouteError("Invalid movie id.", 400));
        return this.movieService.getMovie(movieId)
            .then(movie => res.json(movie))
            .catch((ex: Error) => next(new RouteError(ex.message, 500)));
    }

    addMovie = (req: Request, res: Response, next: any) => {
        if (!req.body.name) return next(new RouteError("Movie name not provided.", 400));
        const { name } = req.body;
        return this.movieService.addMovie(name)
            .then(movie => res.json(movie))
            .catch((ex: Error) => next(new RouteError(ex.message, 500)));
    }

    deleteMovie = (req: Request, res: Response, next: any) => {
        if (!req.params.movieId) return next(new RouteError("Movie id not provided.", 400));
        let movieId = parseInt(req.params.movieId);
        if (isNaN(movieId)) return next(new RouteError("Invalid movie id.", 400));
        return this.movieService.deleteMovie(movieId)
            .then(_ => res.status(204).send())
            .catch((ex: Error) => next(new RouteError(ex.message, 500)));
    }

}
