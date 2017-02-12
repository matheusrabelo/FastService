import application from '../../application/application';

describe('Application', () => {

    const configuration = {
        redis: {
            host: '127.0.0.1',
            port: '6379'
        }
    };

    const appServer = new application(configuration);
    const appHandler = new application(configuration);

    it('Should work correctly for creation of microservice', (done) => {
        appServer.serve('login', (value) => {
            return new Promise((resolve, reject) => {
                const { login, password } = value;
                if (login === 'matheus' && password === '123') {
                    resolve({ success: true });
                }
                reject({ success: false });
            });
        });

        setTimeout(() =>
            appHandler.handle('login', { login: 'matheus', password: '1234' })
                .then((result) => {
                    if (result.success) done(new Error('Should not login'));
                    done();
                })
                .catch((result) => {
                    done(new Error('Should not login'));
                }), 100);
    });

});