export interface IMovie {
    movieId?: number,
    name: string
}

export class Movie implements IMovie {
    constructor() { }

    movieId?: number;
    name: string;
}