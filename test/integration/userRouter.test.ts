import supertest from "supertest";
import app from "../../src/app";
import { UserDataEntry } from "../../src/types";
import { cleanDatabase, generateUser } from "../utils/functions";



afterEach(async () => {
    await cleanDatabase();
});



describe("POST /users",()=>{
    it("should return a 201 status when create a new user successfully!",async()=>{
        const body:UserDataEntry = {
            email: "jorge@email.com",
            password: "itaquaquecetuba"
        }
        const result = await supertest(app).post("/users").send(body);
        expect(result.status).toEqual(201);
    });
    it("should thrown a conflict error with 409 status when the email sent is already been used",async()=>{
        const {user,newUser} = await generateUser();
        const result = await supertest(app).post("/users").send(user);
        expect(result.text).toEqual("The informed email is already been used!");
        expect(result.status).toEqual(409);
    });
    it("should thrown a bad request error with 400 status when the body of the request is not valid: password missing",async ()=>{
        const body = {
            email: "jorge@email.com"
        }
        const result = await supertest(app).post("/users").send(body);
        expect(result.status).toEqual(400);
        expect(result.text).toEqual("\"password\" is required");
    });
    it("should thrown a bad request error with 400 status when the body of the request is not valid: email missing",async ()=>{
        const body = {
            password: "xablau"
        }
        const result = await supertest(app).post("/users").send(body);
        expect(result.status).toEqual(400);
        expect(result.text).toEqual("\"email\" is required");
    });
    it("should thrown a bad request error with 400 status when the body of the request is not valid: email not valid",async ()=>{
        const body = {
            email: "jorge@emai",
            password: "xablau"
        }
        const result = await supertest(app).post("/users").send(body);
        expect(result.status).toEqual(400);
        expect(result.text).toEqual("\"email\" must be a valid email");
    });
    it("should thrown a bad request error with 400 status when the body of the request is not valid: password not valid",async ()=>{
        const body = {
            email: "jorge@email.com",
            password: "xabl"
        }
        const result = await supertest(app).post("/users").send(body);
        expect(result.status).toEqual(400);
        expect(result.text).toEqual("\"password\" length must be at least 6 characters long");
    });
})

describe("POST /users/auth",()=>{
    it("should return a 200 status when the login is made successfully and return a token",async()=>{
        const {user,newUser} = await generateUser();
        const result = await supertest(app).post("/users/auth").send(user);
        expect(result.status).toEqual(200);
    });
    it("should thrown a not found error with 404 status when the data does not match with any user",async()=>{
        const body:UserDataEntry = {
            email: "jorge@email.com",
            password: "itaquaquecetuba"
        }
        const result = await supertest(app).post("/users/auth").send(body);
        expect(result.status).toEqual(404);
        expect(result.text).toEqual("The informed email does not belong to any registered user!");
    });
    it("should thrown a bad request error with 400 status when the body of the request is not valid: password missing",async ()=>{
        const body = {
            email: "jorge@email.com"
        }
        const result = await supertest(app).post("/users/auth").send(body);
        expect(result.status).toEqual(400);
        expect(result.text).toEqual("\"password\" is required");
    });
    it("should thrown a bad request error with 400 status when the body of the request is not valid: email missing",async ()=>{
        const body = {
            password: "xablau"
        }
        const result = await supertest(app).post("/users/auth").send(body);
        expect(result.status).toEqual(400);
        expect(result.text).toEqual("\"email\" is required");
    });
    it("should thrown a bad request error with 400 status when the body of the request is not valid: email not valid",async ()=>{
        const body = {
            email: "jorge@emai",
            password: "xablau"
        }
        const result = await supertest(app).post("/users/auth").send(body);
        expect(result.status).toEqual(400);
        expect(result.text).toEqual("\"email\" must be a valid email");
    });
    it("should thrown a bad request error with 400 status when the body of the request is not valid: password not valid",async ()=>{
        const body = {
            email: "jorge@email.com",
            password: "xabl"
        }
        const result = await supertest(app).post("/users/auth").send(body);
        expect(result.status).toEqual(400);
        expect(result.text).toEqual("\"password\" length must be at least 6 characters long");
    });
    it("should thrown a unauthorized error with 401 status when the credentials are not valid",async()=>{
        const {user,newUser} = await generateUser();
        const result = await supertest(app).post("/users/auth").send({email:user.email,password:"any"+user.password});
        expect(result.text).toEqual("Invalid Credentials");
        expect(result.status).toEqual(401);
        
    });
})