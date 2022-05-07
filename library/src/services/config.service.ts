import { IConfigModel, ConfigModel } from "../models/config.model";

export class ConfigService {
    constructor(
        private config: IConfigModel = new ConfigModel()
    ) { }

    get baseApi(): string { return this.config.baseApi }
    get prefix(): string { return this.config.prefix }
    get token(): string { return this.config.token }

}