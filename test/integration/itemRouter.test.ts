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

describe("GET /items", ()=>{
    it("should return a list of items",async()=>{
        const body:UserDataEntry = {
            email: "joao@email.com",
            password: "itaquaquecetuba"
        }
        const result = await supertest(app).post("/users").send(body);
        expect(result.status).toEqual(201);
    });
    it.todo("should thrown a unauthorized error with 401 status when the authentication has failed");
});

describe("POST /items",()=>{
    it.todo("should return a 201 status when a new item is created successfully!");
    it.todo("should thrown a unauthorized error with 401 status when the authentication has failed");
    it.todo("should thrown a bad request error with 400 status when the body of the request is not valid");
})

