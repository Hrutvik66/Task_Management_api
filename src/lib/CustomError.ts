/**
 * Custom error class with status code
 */
class CustomError extends Error {
    /**
     * Status code for the error
     */
    public statusCode: number;

    /**
     * @param message - The error message
     * @param statusCode - The status code
     */
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}

export default CustomError;