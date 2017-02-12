import 'mocha';
import { expect } from 'chai';
import { redisMock } from '../mocks'; 
import Creator from '../../services/creator';

describe('Creator', () => {

    let creator: any;
    let redis: any;

    beforeEach((done) => {
        redis = new redisMock({});
        creator = new Creator(redis, redis);
        done();
    });

    it('Should publish unique id on channel service', (done) => {
        creator.create('service', 'value')
            .then((result) => {
                done(new Error('expected Promise to be reject'));
                done();
            })
            .catch((result) => {
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

    it('Should set key for unique id', (done) => {
        creator.create('service', 'value')
            .then((result) => {
                done(new Error('expected Promise to be reject'));
            })
            .catch((result) => {
                expect(redis.values).not.to.be.deep.equal({});
                done();
            });
    });

});