import * as fs from 'fs';
import { inject, injectable } from 'inversify';
import { IMovieMaidenDatabaseContext, Movie } from 'movie-maiden-database';
import { TYPES } from '../composition/app.composition.types';

export interface IMovieService {
    getAllMovies: () => Promise<Movie[]>;
    getMovie: (movieId: number) => Promise<Movie>;
    addMovie: (name: string) => Promise<Movie>;
    deleteMovie: (movieId: number) => Promise<void>;
}

@injectable()
export class MovieService implements IMovieService {
    constructor(@inject(TYPES.MovieMaidenDatabaseContext) private context: IMovieMaidenDatabaseContext) { }

    getAllMovies = (): Promise<Movie[]> => {
        return this.context.models.movie.find({
            columns: ['movieId', 'name']
        });
    }

    getMovie = (movieId: number): Promise<Movie> => {
        return this.context.models.movie.findOne({
            identity: 'movieId',
            columns: ['movieId', 'name'],
            args: [movieId]
        });
    }

    addMovie = (name: string): Promise<Movie> => {
        let movie = new Movie();
        movie.name = name;
        return this.context.models.movie.insertOne(movie)
            .then(id => this.getMovie(id));
    }

    deleteMovie = (movieId: number): Promise<void> => {
        return this.context.models.movie.deleteOne({
            identity: 'movieId',
            args: [movieId]
        });
    }
    
}