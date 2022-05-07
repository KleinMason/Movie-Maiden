import data from '../config/app.config.json';

export interface IConfigModel {
    token: string;
    prefix: string;
    // intents: string[];
}

export class ConfigModel implements IConfigModel {

    token: string;
    prefix: string;
    // intents: string[];

    constructor() {
        this.token = data.token;
        this.prefix = data.prefix;
        // this.intents = data.intents;
    }
}