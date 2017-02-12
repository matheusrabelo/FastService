import 'mocha';
import { expect } from 'chai';
import { redisMock } from '../mocks'; 
import Listener from '../../services/listener';

describe('Listener', () => {

    let listener: any;
    let redis: any;

    beforeEach((done) => {
        redis = new redisMock({});
        listener = new Listener(redis, redis);
        done();
    });

    it('Should start listening on service channel', (done) => {
        listener.listen('service', (value) => {
            return new Promise((resolve, reject) => {
                resolve();
            });
        }).catch(() => done());
    });

});