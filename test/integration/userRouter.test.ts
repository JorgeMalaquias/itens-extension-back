import supertest from "supertest";
import app from "../../src/app";
import { UserDataEntry } from "../../src/types";
import { cleanDatabase } from "../utils/functions";

beforeAll(async () => {
    await cleanDatabase();
});

afterEach(async()=>{
    await cleanDatabase();
});

describe("POST /users",()=>{
    it("should return a 201 status when create a new user successfully!",async()=>{
        const body:UserDataEntry = {
            email: "joao@email.com",
            password: "itaquaquecetuba"
        }
        const result = await supertest(app).post("/users").send(body);
        expect(result.status).toEqual(201);
    });
    it.todo("should thrown a conflict error with 409 status when the email sent is already been used");
    it.todo("should thrown a bad request error with 400 status when the body of the request is not valid");
})

describe("POST /users/auth",()=>{
    it.todo("should return a 200 status when the login is made successfully and return a token");
    it.todo("should thrown a not found error with 404 status when the data does not match with any user");
    it.todo("should thrown a bad request error with 400 status when the body of the request is not valid");
    it.todo("should thrown a unauthorized error with 401 status when the credentials are not valid");
})