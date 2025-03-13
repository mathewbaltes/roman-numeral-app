// Type definitions for the API responses
type ExpressValidatorError = {
    type: string,
    msg: string,
    path: string,
    location: string,
}

export type RomanNumeralResponse = {
    output?: string,
    input?: string,
    errors?: Array<ExpressValidatorError>
}