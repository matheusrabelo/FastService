import 'mocha';
import { expect } from 'chai';
import { getValue, setValue } from '../../services/processors';

describe('Processors', () => {

    it('Should process value of type number correctly', () => {
        const value = 123;
        const processedValue = setValue(value);
        const oldProcessedValue= getValue(processedValue);

        expect(value).to.be.deep.equal(oldProcessedValue);
        expect(processedValue).to.be.deep.equal('123');
    });

    it('Should process value of type object to stringify version', () => {
        const value = { key: 'value' };
        const processedValue = setValue(value);
        const oldProcessedValue= getValue(processedValue);
        const stringifyVersion = JSON.stringify(value);

        expect(value).to.be.deep.equal(oldProcessedValue);
        expect(processedValue).to.be.deep.equal(stringifyVersion);
    });

    it('Should process value of type boolean correctly', () => {
        const value = false;
        const processedValue = setValue(value);
        const oldProcessedValue= getValue(processedValue);

        expect(value).to.be.deep.equal(oldProcessedValue);
        expect(processedValue).to.be.deep.equal('false');
    });

});