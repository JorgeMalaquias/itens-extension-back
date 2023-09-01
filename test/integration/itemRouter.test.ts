import supertest from "supertest";
import app from "../../src/app";
import { cleanDatabase, generateUser } from "../utils/functions";



beforeEach(async () => {
    await cleanDatabase();
});

describe("GET /items", ()=>{
    it("should return a list of items",async()=>{
        const user = await generateUser();

        await supertest(app).post("/users").send(user);
        const login = await supertest(app).post("/users/auth").send(user);
        const token = login.text;
        const headers = {Authorization:`Bearer ${token}`};

        const result = await supertest(app).get("/items").set(headers);
        expect(result.status).toEqual(200);
    });
    it("should thrown a unauthorized error with 401 status when the authentication has failed",async()=>{
        const user = await generateUser();
        await supertest(app).post("/users").send(user);

        const login = await supertest(app).post("/users/auth").send(user);
        const token = login.text;
        const headers = {authorization:`${token}`};

        const result = await supertest(app).get("/items").set(headers);
        expect(result.status).toEqual(401);
    });
    it("should thrown a unauthorized error with 401 status when the authentication has failed",async()=>{
        const result = await supertest(app).get("/items");
        expect(result.status).toEqual(401);
    });
});

describe("POST /items",()=>{
    it.todo("should return a 201 status when a new item is created successfully!");
    it.todo("should thrown a unauthorized error with 401 status when the authentication has failed");
    it.todo("should thrown a bad request error with 400 status when the body of the request is not valid");
})

