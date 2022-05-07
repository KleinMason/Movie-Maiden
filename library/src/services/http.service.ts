import fetch from "node-fetch";
import { IMovie, Movie } from "../models/movie.model";
import { ConfigService } from "./config.service";

export interface IHttpService {
    configService: ConfigService;
    api: string;
    postMovie(movie: Movie);
}

export class HttpService implements IHttpService {
    constructor() {
        this.configService = new ConfigService;
        this.api = this.configService.baseApi;
    }

    configService: ConfigService;
    api: string;

    postMovie = async (movie: Movie): Promise<void> => {
        const url: string = this.api + '/movie/add';
        return await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                name: movie.name
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                console.log(res)
                if (res.status != 500) return Promise.resolve(res.json());
                return Promise.reject(res.statusText);
            });
    }
}