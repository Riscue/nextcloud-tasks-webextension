export const PromiseService = {
    that: undefined,

    bind: function (that) {
        this.that = that;
        return this;
    },

    then: function (promise, successFn, errorFn) {
        promise
            .then((response) => {
                successFn.call(this.that, response);
            })
            .catch((err) => {
                if (errorFn) {
                    errorFn.call(this.that, err);
                } else {
                    this.errorFn(err);
                }
            });
    },

    errorFn: function (err) {
        alert(err);
    }
};
