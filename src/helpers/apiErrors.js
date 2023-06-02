export class ApiError extends Error {
    statusCode = 0;

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}


export class UnauthorizedError extends ApiError {
    constructor(message) {
        super(message, 401);
    }
}


export class BadRequestError extends ApiError {
    constructor(message) {
        super(message, 400);
    }
}


export class NotFoundError extends ApiError {
    constructor(message) {
        super(message, 404);
    }
}