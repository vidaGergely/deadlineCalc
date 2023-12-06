"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationException extends Error {
    constructor(errors) {
        super(errors);
        this.name = 'ValidationException';
    }
}
exports.default = ValidationException;
