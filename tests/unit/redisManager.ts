import 'mocha';
import { expect } from 'chai';
import { redisMock } from '../mocks'; 
import RedisManager from '../../services/redisManager';

describe('RedisManager', () => {

    let redisManager: any;
    let redis: any;
    let subscriber: any;

    beforeEach(() => {
        redisManager = new RedisManager({}, redisMock);
        redis = redisManager.getRedisClient();
        subscriber = redisManager.getSubscriberClient();
    });

    it('Should construct two instances of Redis', () => {
        expect(redis).to.be.instanceOf(redisMock);
        expect(subscriber).to.be.instanceOf(redisMock);
        expect(redis).to.be.not.equal(subscriber);
    });

    it('Should call create method from creator class', (done) => {
        redisManager.create('service', { 'key': 'value' })
            .then(res => {
                done(new Error('expected Promise to be reject'));
                done();
            })
            .catch(res => {
                const published = redis.published;
                const lastPublished = published[published.length - 1];
                expect(published).to.be.not.undefined;
                expect(lastPublished)
                    .to.have.property('key', 'service');
                expect(lastPublished)
                    .to.have.property('value');
                done();
            });
    });

    it('Should call listen method from listener class', (done) => {
        redisManager.serve('service', (value) => {
            return new Promise((resolve, reject) => {
                resolve();
            });
        })
            .catch(() => done());
    });

});