import supertest from "supertest";
import app from "../../src/app";
import { cleanDatabase, generateItem, generateUser, itemSeed } from "../utils/functions";


afterEach(async () => {
    await cleanDatabase();
});


describe("GET /items", ()=>{
    it("should return a list of items",async()=>{
        await itemSeed();
        const {user, newUser} = await generateUser();
        const login = await supertest(app).post("/users/auth").send(user);
        const token = login.text;
        const headers = {Authorization:`Bearer ${token}`};

        const result = await supertest(app).get("/items").set(headers);
        expect(result.status).toEqual(200);
    });
    it("should thrown a unauthorized error with 401 status when the authentication has failed",async()=>{
        const {user, newUser} = await generateUser();

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
    it("should return a 201 status when a new item is created successfully!",async()=>{
        const {user, newUser} = await generateUser();

        const login = await supertest(app).post("/users/auth").send(user);
        const token = login.text;
        const headers = {Authorization:`Bearer ${token}`};
        const item = generateItem();
        const result = await supertest(app).post("/items").send(item).set(headers);
        expect(result.status).toEqual(201);
    });
    it("should thrown a unauthorized error with 401 status when the authentication has failed",async()=>{
        const {user, newUser} = await generateUser();

        const login = await supertest(app).post("/users/auth").send(user);
        const token = login.text;
        const headers = {Authorization:`${token}`};
        const item = generateItem();
        const result = await supertest(app).post("/items").send(item).set(headers);
        expect(result.status).toEqual(401);
    });
    it("should thrown a unauthorized error with 401 status when the authentication has failed",async()=>{
        const item = generateItem();
        const result = await supertest(app).post("/items").send(item);
        expect(result.status).toEqual(401);
    });
    it("should thrown a bad request error with 400 status when the body of the request is not valid",async()=>{
        const {user, newUser} = await generateUser();

        const login = await supertest(app).post("/users/auth").send(user);
        const token = login.text;
        const headers = {Authorization:`Bearer ${token}`};
        const item = {
            description: "some random description"
        };
        const result = await supertest(app).post("/items").send(item).set(headers);
        expect(result.status).toEqual(400);
    });
})

