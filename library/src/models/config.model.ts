import { stringify } from 'querystring';
import data from '../config/app.config.json';

export interface IConfigModel {
    token: string;
    prefix: string;
    baseApi: string;
    // intents: string[];
}

export class ConfigModel implements IConfigModel {

    token: string;
    prefix: string;
    baseApi: string;
    // intents: string[];

    constructor() {
        this.token = data.token;
        this.prefix = data.prefix;
        this.baseApi = data.baseApi;
        // this.intents = data.intents;
    }
}