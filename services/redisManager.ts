import * as Redis from 'ioredis';
import Listener from './listener';
import Creator from './creator';

export default class {
    private redis;
    private subscriber;
    private creator: Creator;
    private listener: Listener;

    constructor(redisConfiguration, RedisConstructor) {
        this.redis = new RedisConstructor(redisConfiguration.redis);
        this.subscriber = new RedisConstructor(redisConfiguration.redis);
        this.creator = new Creator(this.redis, this.subscriber);
        this.listener = new Listener(this.redis, this.subscriber);

        this.redis.on('error', (error) => console.error(error));
        this.subscriber.on('error', (error) => console.error(error));
    }

    public create(service: string, value: any): Promise<any> {
        return this.creator.create(service, value);
    }

    public serve(service: string, callback: (value: any) => Promise<any>): Promise<any> {
        return this.listener.listen(service, callback);
    }

    public getRedisClient() {
        return this.redis;
    }

    public getSubscriberClient() {
        return this.subscriber;
    }
}