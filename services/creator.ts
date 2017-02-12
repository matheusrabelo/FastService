import * as Redis from 'ioredis';
import { v1 } from 'uuid';
import { getValue, setValue } from './processors';

export default class {
    private redis: Redis;
    private sub: Redis;

    constructor(redis: Redis, subscriber: Redis) {
        this.redis = redis;
        this.sub = subscriber;
    }

    public create(service: string, value: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const uniqueID = v1();
            this.redis.publish(service, uniqueID);
            this.redis.set(uniqueID, setValue(value));
            this.sub.subscribe(service, (err, count) => {
                if (err) reject(err)
                 this.sub.on('message', (channel, message) => {
                    if (channel === service && message === uniqueID) {
                        this.redis.get(uniqueID, (err, result) => {
                            if (err) reject(err);
                            resolve(getValue(result));
                        });
                    }
                });
            });
        });
    }

}
