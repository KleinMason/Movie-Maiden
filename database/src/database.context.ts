import { DatabaseContext, Collection } from 'mysql-shaman';
import { Movie } from './models/movie';

export interface IMovieMaidenDatabaseContext {
  models: {
    movie: Collection<Movie>
  }
  runQuery: <T>(query: string, args: any) => Promise<T>;
}

export class MovieMaidenDatabaseContext extends DatabaseContext implements IMovieMaidenDatabaseContext {

  models = { 
    movie: new Collection<Movie>()
  }

  runQuery = <T>(query: string, args: any): Promise<T> => {
    return this.query<T>(query, args)
  }

}