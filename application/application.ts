import * as Redis from 'ioredis';
import redisManager from '../services/redisManager';
import { AppConfiguration } from './configuration';

export default class {
    configuration: AppConfiguration;
    manager: redisManager;

    constructor(configuration) {
        this.configuration = configuration;
        this.manager = new redisManager(configuration, Redis);
    }

    public handle(service: string, value: any): Promise<any> {
        return this.manager.create(service, value)
    }

    public serve(service: string, callback: (value: any) => Promise<any>): Promise<any> {
        return this.manager.serve(service, callback);
    }

}
