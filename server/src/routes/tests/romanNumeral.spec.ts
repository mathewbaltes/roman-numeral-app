import { describe, expect, beforeEach, test, afterAll } from '@jest/globals';
import request from 'supertest';
import app from '../../app';

describe("romanNumeral api", () => {
    test("should return roman numeral with valid number", async () => {
        const response = await request(app).get("/romannumeral?query=1234");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ input: "1234", output: "MCCXXXIV" });
    });

    test("should return an error if the number is not valid", async () => {
        const response = await request(app).get("/romannumeral?query=abc1234");
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            errors: [
                {
                    "location": "query",
                    "msg": "Number must be an integer between 1 and 3999",
                    "path": "query",
                    "type": "field",
                    "value": "abc1234",
                }
            ],
        });
    });

    test("should return an error if the number is empty", async () => {
        const response = await request(app).get("/romannumeral?query=");
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            errors: [
                {
                    "location": "query",
                    "msg": "Number must be an integer between 1 and 3999",
                    "path": "query",
                    "type": "field",
                    "value": "",
                }
            ],
        });
    });

    test("should return an error if the number exceeds 3999", async () => {
        const response = await request(app).get("/romannumeral?query=4000");
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            errors: [
                {
                    "location": "query",
                    "msg": "Number must be an integer between 1 and 3999",
                    "path": "query",
                    "type": "field",
                    "value": "4000",
                }
            ],
        });
    });

    test("should return an error if the number is below 1", async () => {
        const response = await request(app).get("/romannumeral?query=0");
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            errors: [
                {
                    "location": "query",
                    "msg": "Number must be an integer between 1 and 3999",
                    "path": "query",
                    "type": "field",
                    "value": "0",
                }
            ],
        });
    });

    test("should rate limit if we request more than 10 times in 1 minute", async () => {
        for (let i = 0; i < 10; i++) {
            await request(app).get("/romannumeral?query=1234");
        }

        const response = await request(app).get("/romannumeral?query=1234");

        // this means we were rate limited
        expect(response.status).toBe(429);
    });
});