import * as Redis from 'ioredis';
import { getValue, setValue } from './processors';

export default class {
    private redis: Redis;
    private sub: Redis;

    constructor(redis: Redis, subscriber: Redis) {
        this.redis = redis;
        this.sub = subscriber;
    }

    public listen(service: string, callback: (value: string) => Promise<any>): Promise<any> {
        return new Promise((resolve, reject) => {
            this.sub.subscribe(service, (err, count) => {
                if (err) reject(err);
                 this.sub.on('message', (channel, uniqueID) => {
                    if (channel === service) {
                        return this.handler(service, uniqueID, callback);
                    }
                });
            });
        });
    }

    private handler(service: string, uniqueID: string, callback: (value: any) => Promise<any>): Promise<any> {
        return new Promise((resolve, reject) => {
            this.redis.get(uniqueID, (err, result) => {
                if (err) reject(err);
                callback(getValue(result))
                    .then(res => {
                        this.redis.set(uniqueID, setValue(res));
                        this.redis.publish(service, uniqueID);
                        resolve();
                    })
                    .catch(res => {
                        this.redis.set(uniqueID, setValue(res));
                        this.redis.publish(service, uniqueID);
                        resolve();
                    });
            });
        });
    }

}
