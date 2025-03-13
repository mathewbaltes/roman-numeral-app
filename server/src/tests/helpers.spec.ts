import { describe, test, expect } from '@jest/globals';
import { convertIntegerToRomanNumeral } from '../helpers';

describe('convertIntegerToRomanNumeral', () => {
    test('converts 1 to I', () => {
        expect(convertIntegerToRomanNumeral(1)).toBe('I');
    });

    test('converts 4 to IV', () => {
        expect(convertIntegerToRomanNumeral(4)).toBe('IV');
    });

    test('converts 9 to IX', () => {
        expect(convertIntegerToRomanNumeral(9)).toBe('IX');
    });

    test('converts 10 to X', () => {
        expect(convertIntegerToRomanNumeral(10)).toBe('X');
    });

    test('converts 40 to XL', () => {
        expect(convertIntegerToRomanNumeral(40)).toBe('XL');
    });

    test('converts 50 to L', () => {
        expect(convertIntegerToRomanNumeral(50)).toBe('L');
    });

    test('converts 90 to XC', () => {
        expect(convertIntegerToRomanNumeral(90)).toBe('XC');
    });

    test('converts 100 to C', () => {
        expect(convertIntegerToRomanNumeral(100)).toBe('C');
    });

    test('converts 400 to CD', () => {
        expect(convertIntegerToRomanNumeral(400)).toBe('CD');
    });

    test('converts 500 to D', () => {
        expect(convertIntegerToRomanNumeral(500)).toBe('D');
    });

    test('converts 900 to CM', () => {
        expect(convertIntegerToRomanNumeral(900)).toBe('CM');
    });

    test('converts 1000 to M', () => {
        expect(convertIntegerToRomanNumeral(1000)).toBe('M');
    });

    test('convers 1234 to MCCXXXIV', () => {
        expect(convertIntegerToRomanNumeral(1234)).toBe('MCCXXXIV');
    });
});