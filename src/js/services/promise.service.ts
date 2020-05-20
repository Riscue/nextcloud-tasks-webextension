import {Service} from '@js/services/service';

export class PromiseService extends Service {

    private that;

    constructor() {
        super(PromiseService);
    }

    bind(that) {
        this.that = that;
        return this;
    }

    then<T = any>(promise: Promise<T>, successFn: Function, errorFn?: Function) {
        promise
            .then((response: T) => {
                successFn.call(this.that, response);
            })
            .catch((err: Error) => {
                if (errorFn) {
                    errorFn.call(this.that, err);
                } else {
                    this.errorFn(err);
                }
            });
    }

    errorFn(err: Error) {
        console.error(err);
    }
}
