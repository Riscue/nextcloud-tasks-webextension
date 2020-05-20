export class AuthenticationError extends Error {

    constructor(private errorCode: string, message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}
