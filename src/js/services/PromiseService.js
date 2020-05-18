export const PromiseService = {
    that: undefined,

    bind(that) {
        this.that = that;
        return this;
    },

    then(promise, successFn, errorFn) {
        promise
            .then(response => {
                successFn.call(this.that, response);
            })
            .catch(err => {
                if (errorFn) {
                    errorFn.call(this.that, err);
                } else {
                    this.errorFn.call(this, err);
                }
            });
    },

    errorFn(err) {
        alert(err);
    }
};