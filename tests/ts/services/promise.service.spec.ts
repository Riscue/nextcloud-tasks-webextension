import {PromiseService} from '@ts/services/promise.service';

describe('Test Promise Service', () => {
    const promiseService = new PromiseService();

    it('bind() -> success call', async () => {
        const promise = new Promise<{ test: string }>((resolve) => {
            return resolve({test: 'resolve'});
        });

        promiseService.bind({test: 'value'}).then(promise, function (val) {
            expect(val.hasOwnProperty('test')).toBe(true);
            expect(val.test).toBe('resolve');
            expect(this.test).toBe('value');
        });
        await expectAsync(promise).toBeResolved();
    });

    it('bind() -> fail call w/ errorFn', async () => {
        const promise = new Promise<{ test: string }>(() => {
            throw new Error('No reason');
        });

        promiseService.bind({test: 'value'}).then(promise, undefined, function () {
            expect(this.test).toBe('value');
        });
        await expectAsync(promise).toBeRejectedWithError();
    });

    it('bind() -> fail call w/o errorFn', async () => {
        const promise = new Promise<{ test: string }>(() => {
            throw new Error('No reason');
        });

        spyOn(console, 'error');
        promiseService.bind({test: 'value'}).then(promise, undefined);
        await expectAsync(promise).toBeRejectedWithError();
        expect(console.error).toHaveBeenCalled();
    });
});
